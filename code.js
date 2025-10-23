var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Show the plugin UI
figma.showUI(__html__, { width: 400, height: 480 });
// Listen for messages from the UI
figma.ui.onmessage = (msg) => __awaiter(this, void 0, void 0, function* () {
    if (msg.type === 'populate-table') {
        try {
            yield populateTable(msg.csvData);
        }
        catch (error) {
            figma.ui.postMessage({
                type: 'populate-error',
                message: error.message
            });
        }
    }
});
function populateTable(csvText) {
    return __awaiter(this, void 0, void 0, function* () {
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
                }
                else if (char === ',' && !inQuotes) {
                    values.push(current.trim());
                    current = '';
                }
                else {
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
        // Find the column template (should be exactly one vertical auto-layout frame)
        let columnTemplate = null;
        for (const child of tableFrame.children) {
            if (child.type === 'FRAME' && 'layoutMode' in child && child.layoutMode === 'VERTICAL') {
                columnTemplate = child;
                break; // Use the first vertical frame as template
            }
        }
        if (!columnTemplate) {
            throw new Error('No column template found. Please add one vertical auto-layout frame with a header and cell.');
        }
        if (columnTemplate.children.length < 2) {
            throw new Error('Column template must have at least 2 children: a header and a cell template.');
        }
        // Hide the template column immediately so it's not visible during population
        columnTemplate.visible = false;
        // Remove any existing columns (except the template)
        const existingColumns = tableFrame.children.filter(child => child !== columnTemplate);
        for (const col of existingColumns) {
            col.remove();
        }
        // Create a column for each CSV header
        let processedColumns = 0;
        for (let colIndex = 0; colIndex < headers.length; colIndex++) {
            const headerName = headers[colIndex];
            // Clone the column template
            const newColumn = columnTemplate.clone();
            newColumn.name = headerName;
            // Make sure the new column is visible (template is hidden)
            newColumn.visible = true;
            // Update the header (first child) with the CSV header name
            const headerNode = newColumn.children[0];
            yield updateTextInNode(headerNode, headerName);
            // Get the cell template (second child)
            const cellTemplate = newColumn.children[1];
            // Remove any existing cells beyond the template
            const existingCells = newColumn.children.slice(2);
            for (const cell of existingCells) {
                cell.remove();
            }
            // Create cells for each data row
            for (let rowIndex = 0; rowIndex < dataRows.length; rowIndex++) {
                const value = dataRows[rowIndex][colIndex] || '';
                if (rowIndex === 0) {
                    // Use the template cell for the first row (don't clone)
                    yield updateTextInNode(cellTemplate, value);
                }
                else {
                    // Clone the template for subsequent rows
                    const newCell = cellTemplate.clone();
                    // Find text node and update it
                    yield updateTextInNode(newCell, value);
                    // Append to column frame (auto-layout will position it)
                    newColumn.appendChild(newCell);
                }
            }
            // Add the column to the table
            tableFrame.appendChild(newColumn);
            processedColumns++;
        }
        // Remove the original template column
        columnTemplate.remove();
        // Send success message
        figma.ui.postMessage({
            type: 'populate-complete',
            rowCount: dataRows.length,
            columnCount: processedColumns
        });
        figma.notify(`✅ Populated ${dataRows.length} rows across ${processedColumns} columns!`);
    });
}
// Format values for display (add commas to dollar amounts)
function formatValue(value) {
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
function updateTextInNode(node, value) {
    return __awaiter(this, void 0, void 0, function* () {
        if (node.type === 'TEXT') {
            // Load the font before changing text
            yield figma.loadFontAsync(node.fontName);
            // Format the value before setting
            node.characters = formatValue(value);
        }
        else if ('children' in node) {
            // Recursively search children
            for (const child of node.children) {
                yield updateTextInNode(child, value);
            }
        }
    });
}
