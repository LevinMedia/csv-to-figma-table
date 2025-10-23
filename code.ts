// Show the plugin UI
figma.showUI(__html__, { width: 400, height: 480 });

// Listen for messages from the UI
figma.ui.onmessage = async (msg) => {
  if (msg.type === 'populate-table') {
    try {
      await populateTable(msg.csvData);
    } catch (error) {
      figma.ui.postMessage({
        type: 'populate-error',
        message: error.message
      });
    }
  }
};

async function populateTable(csvText: string) {
  // Parse CSV
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  const dataRows = lines.slice(1).map(line => {
    // Handle CSV with quoted values
    const values = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim());
    return values;
  });

  // Get selected node
  const selection = figma.currentPage.selection;
  if (selection.length === 0) {
    throw new Error('Please select the table container frame');
  }

  const tableFrame = selection[0];
  if (tableFrame.type !== 'FRAME' || !('layoutMode' in tableFrame) || tableFrame.layoutMode !== 'HORIZONTAL') {
    throw new Error('Selected node must be a horizontal auto-layout frame');
  }

  // Find column frames
  const columnFrames: { name: string; frame: FrameNode; headerIndex: number }[] = [];
  
  for (const child of tableFrame.children) {
    if (child.type === 'FRAME' && 'layoutMode' in child && child.layoutMode === 'VERTICAL') {
      const columnName = child.name;
      const headerIndex = headers.indexOf(columnName);
      
      if (headerIndex !== -1) {
        columnFrames.push({
          name: columnName,
          frame: child as FrameNode,
          headerIndex: headerIndex
        });
      }
    }
  }

  if (columnFrames.length === 0) {
    throw new Error('No column frames found. Make sure column frames are named after CSV headers.');
  }

  // Process each column
  let processedColumns = 0;

  for (const { name, frame, headerIndex } of columnFrames) {
    // Find the cell template (should be second child, after header)
    if (frame.children.length < 2) {
      console.warn(`Column "${name}" doesn't have a cell template. Skipping.`);
      continue;
    }

    const cellTemplate = frame.children[1]; // Second element is the cell template

    // Remove any existing cells beyond the template
    const existingCells = frame.children.slice(2);
    for (const cell of existingCells) {
      cell.remove();
    }

    // Create cells for each data row
    for (let rowIndex = 0; rowIndex < dataRows.length; rowIndex++) {
      const value = dataRows[rowIndex][headerIndex] || '';
      
      if (rowIndex === 0) {
        // Use the template cell for the first row (don't clone)
        await updateTextInNode(cellTemplate, value);
      } else {
        // Clone the template for subsequent rows
        const newCell = cellTemplate.clone();
        
        // Find text node and update it
        await updateTextInNode(newCell, value);
        
        // Append to column frame (auto-layout will position it)
        frame.appendChild(newCell);
      }
    }

    processedColumns++;
  }

  // Send success message
  figma.ui.postMessage({
    type: 'populate-complete',
    rowCount: dataRows.length,
    columnCount: processedColumns
  });

  figma.notify(`✅ Populated ${dataRows.length} rows across ${processedColumns} columns!`);
}

// Format values for display (add commas to dollar amounts)
function formatValue(value: string): string {
  // Check if value starts with $
  if (value.startsWith('$')) {
    // Remove $, parse number, format with commas, add $ back
    const numberPart = value.substring(1);
    const number = parseFloat(numberPart);
    
    if (!isNaN(number)) {
      // Format with commas and preserve decimals
      const formatted = number.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      return '$' + formatted;
    }
  }
  
  // Return as-is if not a dollar amount
  return value;
}

// Recursively find and update text nodes
async function updateTextInNode(node: SceneNode, value: string) {
  if (node.type === 'TEXT') {
    // Load the font before changing text
    await figma.loadFontAsync(node.fontName as FontName);
    // Format the value before setting
    node.characters = formatValue(value);
  } else if ('children' in node) {
    // Recursively search children
    for (const child of node.children) {
      await updateTextInNode(child, value);
    }
  }
}

