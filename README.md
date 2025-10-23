# CSV Table Populator - Figma Plugin

Automatically populate Figma tables with CSV data while maintaining your custom cell and header designs!

## 🎯 How It Works

This plugin reads your CSV file and automatically creates a complete table in Figma:
- **One template column**: Create just one column with your custom header and cell design
- **Automatic columns**: Plugin clones your template for every CSV column
- **Auto-layout**: Positioning and spacing handled automatically
- **Your styling preserved**: All colors, fonts, borders, shadows, and effects maintained

## 📋 Setup Instructions

### 1. Create Your Table Structure in Figma

```
📦 Table Container (any name)
   Type: Frame with HORIZONTAL auto-layout
   
   └── 📁 Column Template (any name)
       Type: Frame with VERTICAL auto-layout
       ├── Header Component (your custom design)
       └── Cell Component (your custom design - this gets cloned)
```

### 2. That's It!

Just create **ONE column template** with:
1. **Header** (position 1) - will show CSV column names
2. **Cell Template** (position 2) - gets cloned for each data row

The plugin will automatically:
- Clone your column template for each CSV column
- Set header text to CSV header names
- Populate all cells with your data
- Remove the template column when done

## 🚀 Usage

1. **Select** the main table frame (the horizontal auto-layout container)
2. **Run** the plugin: `Plugins → Development → CSV Table Populator`
3. **Upload** your CSV file
4. **Click** "Populate Table"
5. **Done!** Your table is populated with data

## ✨ Features

- ✅ **One template, infinite columns**: Design once, populate any CSV
- ✅ **Automatic column creation**: No need to pre-create all columns
- ✅ **Preserves all your styling**: Colors, fonts, borders, shadows, effects
- ✅ **Auto-layout friendly**: Handles spacing and positioning automatically
- ✅ **Component support**: Works with component instances
- ✅ **Nested text**: Finds text nodes anywhere in your cell structure
- ✅ **Easy updates**: Re-run to refresh data (old columns replaced)

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

Check out `pizza_menu.csv` in this repo for a fun example:

```csv
Pies,Toppings,Price,Rating
Margherita,Mozzarella & Basil,$12.99,⭐⭐⭐⭐⭐
Pepperoni Classic,Pepperoni & Cheese,$14.99,⭐⭐⭐⭐⭐
Hawaiian,Ham & Pineapple,$13.99,⭐⭐⭐⭐
Meat Lovers,Pepperoni & Sausage & Bacon,$17.99,⭐⭐⭐⭐⭐
```

The plugin will automatically create 4 columns (Pies, Toppings, Price, Rating) from just one template!

## 🔧 Installation

### Option 1: Use in Figma Desktop

1. Open Figma Desktop App
2. Go to `Plugins → Development → Import plugin from manifest...`
3. Select the `manifest.json` file from this folder
4. The plugin is now available in `Plugins → Development → CSV Table Populator`

### Option 2: Modify the Code

The plugin is written in JavaScript (`code.js`). Feel free to modify it to add custom features!

## ⚠️ Troubleshooting

**"Please select the table container frame"**
- Make sure you've selected the main horizontal auto-layout frame before running

**"No column template found"**
- Ensure you have at least one vertical auto-layout frame inside the container
- The column template should be a direct child of the main frame

**"Column template must have at least 2 children"**
- Your column template needs a header (first child) and cell template (second child)
- Add a text element for the header and another for the cell

**Text not updating**
- Make sure each cell has at least one text layer
- Check that the text layer isn't locked
- Text can be nested inside frames - the plugin searches recursively

**Spacing looks wrong**
- Adjust auto-layout spacing in Figma (not in the plugin)
- Set gap/padding on your frames and column template

## 🎓 Tips

- **Start super simple**: Just create a basic text header and text cell to test first
- **Test with pizza_menu.csv**: Use the included example to verify everything works
- **Use components**: Make your header and cell components for consistent styling
- **One template = all columns**: All columns will look identical (that's the point!)
- **Auto-layout settings**: Spacing in your template is preserved across all columns
- **Responsive design**: Use "Fill container" width on your column template
- **Re-run anytime**: Upload new CSV to refresh data - old columns are replaced

## 📄 License

This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 2 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program; if not, write to the Free Software Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.

