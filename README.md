# CSV Table Populator - Figma Plugin

Automatically populate Figma tables with CSV data while maintaining your custom cell and header designs!

## 🎯 How It Works

This plugin reads your CSV file and populates a table structure in Figma based on:
- **Your custom designs**: You control all styling (headers, cells, colors, fonts, etc.)
- **Auto-layout**: Positioning and spacing handled automatically
- **Column matching**: Column frames match CSV header names

## 📋 Setup Instructions

### 1. Create Your Table Structure in Figma

```
📦 Your CSV Name (e.g., "commission_anomaly_detection_sample")
   Type: Frame with HORIZONTAL auto-layout
   
   ├── 📁 record_id
   │   Type: Frame with VERTICAL auto-layout
   │   ├── Header Component (your custom design)
   │   └── Cell Component (your custom design - this gets cloned)
   │
   ├── 📁 deal_size
   │   Type: Frame with VERTICAL auto-layout
   │   ├── Header Component
   │   └── Cell Component
   │
   └── ... (one frame per column you want to populate)
```

### 2. Naming Requirements

- **Parent Frame**: Can be any name (recommended: CSV filename)
- **Column Frames**: MUST match CSV header names exactly
  - CSV header: `deal_size` → Frame name: `deal_size` ✅
  - CSV header: `commission_payout` → Frame name: `commission_payout` ✅

### 3. Cell Template

- Each column frame should have exactly 2 children:
  1. **Header** (position 1) - stays as-is
  2. **Cell Template** (position 2) - gets cloned for each data row

The plugin will:
- Keep the header
- Clone the cell template for each row in your CSV
- Update text content automatically

## 🚀 Usage

1. **Select** the main table frame (the horizontal auto-layout container)
2. **Run** the plugin: `Plugins → Development → CSV Table Populator`
3. **Upload** your CSV file
4. **Click** "Populate Table"
5. **Done!** Your table is populated with data

## ✨ Features

- ✅ **Preserves all your styling**: Colors, fonts, borders, shadows, effects
- ✅ **Auto-layout friendly**: Handles spacing and positioning automatically
- ✅ **Component support**: Works with component instances
- ✅ **Nested text**: Finds text nodes anywhere in your cell structure
- ✅ **Easy updates**: Re-run to refresh data (removes old cells first)

## 🎨 Customization Examples

### Basic Cell
```
Frame (Cell)
└── Text: "{{value}}"
```

### Styled Cell with Icon
```
Frame (Cell) - Auto-layout horizontal
├── Icon (SVG or Component)
└── Text: "{{value}}"
```

### Badge/Pill Cell
```
Frame (Cell) - Rounded corners, colored background
└── Text: "{{value}}" - Bold, custom color
```

### Complex Cell
```
Frame (Cell) - Auto-layout vertical
├── Text (Title): "{{value}}"
├── Frame (Progress bar)
└── Text (Subtitle)
```

The plugin will find the **first text node** and update it with the CSV value.

## 📝 Example CSV

```csv
record_id,deal_size,commission_payout,commission_rate
1,285432.15,51377.79,18.0
2,12847.23,4015.84,31.25
3,387216.88,19360.84,5.0
```

## 🔧 Installation

### Option 1: Use in Figma Desktop

1. Open Figma Desktop App
2. Go to `Plugins → Development → Import plugin from manifest...`
3. Select the `manifest.json` file from this folder
4. The plugin is now available in `Plugins → Development → CSV Table Populator`

### Option 2: Build from Source

If you modify `code.ts`, compile it to JavaScript:

```bash
# Install TypeScript if needed
npm install -g typescript

# Compile
tsc code.ts --target es6 --outFile code.js
```

Or use the provided code.js directly (already compiled).

## ⚠️ Troubleshooting

**"Please select the table container frame"**
- Make sure you've selected the main horizontal auto-layout frame before running

**"No column frames found"**
- Check that your column frame names match CSV headers exactly (case-sensitive)
- Ensure column frames are direct children of the main frame
- Verify column frames are set to vertical auto-layout

**Text not updating**
- Make sure each cell has at least one text layer
- Check that the text layer isn't locked

**Spacing looks wrong**
- Adjust auto-layout spacing in Figma (not in the plugin)
- Set gap/padding on your frames

## 🎓 Tips

- **Test with small CSV first**: Start with 2-3 rows to verify structure
- **Use components**: Make your headers and cells components for easy updates
- **Variants for states**: Create variants for different cell states (normal, anomaly, etc.)
- **Auto-layout settings**: Set "Space between items" for consistent spacing
- **Responsive design**: Use "Fill container" on cells for flexible widths

## 📄 License

This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 2 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program; if not, write to the Free Software Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.

