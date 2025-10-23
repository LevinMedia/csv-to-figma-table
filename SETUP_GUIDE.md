# 🎨 Quick Setup Guide

## Visual Structure Example

Here's exactly what your Figma file should look like:

```
┌─────────────────────────────────────────────────────────────────┐
│  📦 commission_anomaly_detection_sample                         │
│  (Frame, Horizontal Auto-layout, Gap: 0px)                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │ 📁 record│  │ 📁 deal_ │  │📁 commis │  │📁 is_ano │       │
│  │    _id   │  │   size   │  │  sion_   │  │   maly   │       │
│  │ (Vertical│  │ (Vertical│  │  payout  │  │ (Vertical│       │
│  │  Auto-   │  │  Auto-   │  │ (Vertical│  │  Auto-   │       │
│  │  layout) │  │  layout) │  │  Auto-   │  │  layout) │       │
│  │          │  │          │  │  layout) │  │          │       │
│  │ ┌──────┐ │  │ ┌──────┐ │  │ ┌──────┐ │  │ ┌──────┐ │       │
│  │ │RECORD│ │  │ │ DEAL │ │  │ │PAYOUT│ │  │ │STATUS│ │       │
│  │ │  ID  │ │  │ │ SIZE │ │  │ │      │ │  │ │      │ │       │
│  │ └──────┘ │  │ └──────┘ │  │ └──────┘ │  │ └──────┘ │       │
│  │ (Header) │  │ (Header) │  │ (Header) │  │ (Header) │       │
│  │          │  │          │  │          │  │          │       │
│  │ ┌──────┐ │  │ ┌──────┐ │  │ ┌──────┐ │  │ ┌──────┐ │       │
│  │ │ 123  │ │  │ │50,000│ │  │ │5,000 │ │  │ │Normal│ │       │
│  │ └──────┘ │  │ └──────┘ │  │ └──────┘ │  │ └──────┘ │       │
│  │ (Cell    │  │ (Cell    │  │ (Cell    │  │ (Cell    │       │
│  │ Template)│  │ Template)│  │ Template)│  │ Template)│       │
│  │          │  │          │  │          │  │          │       │
│  │  ↓ Plugin│  │  ↓ Plugin│  │  ↓ Plugin│  │  ↓ Plugin│       │
│  │   clones │  │   clones │  │   clones │  │   clones │       │
│  │   these  │  │   these  │  │   these  │  │   these  │       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
└─────────────────────────────────────────────────────────────────┘
```

## Step-by-Step Checklist

### ✅ Step 1: Create Main Container
- [ ] Create a **Frame** (F key)
- [ ] Turn on **Auto-layout** (Shift + A)
- [ ] Set direction to **Horizontal**
- [ ] Set spacing to **0** (or desired gap between columns)
- [ ] Name it anything you want (e.g., "MyTable" or your CSV name)

### ✅ Step 2: Create Column Frames

For EACH column you want to show:
- [ ] Create a **Frame** inside the main container
- [ ] Turn on **Auto-layout** (Shift + A)
- [ ] Set direction to **Vertical**
- [ ] Set spacing to **0** (or desired gap between cells)
- [ ] **IMPORTANT**: Name it EXACTLY as the CSV header
  - CSV has `deal_size` → Frame must be named `deal_size`
  - CSV has `commission_payout` → Frame must be named `commission_payout`
  - Case-sensitive! Must match exactly!

### ✅ Step 3: Add Header & Cell Template

Inside EACH column frame:
- [ ] Add your **Header** component/design (first child)
  - Can be a component, text, or any design
  - This stays at the top, doesn't get cloned
  
- [ ] Add your **Cell template** (second child)
  - Can be a component, frame with text, or any design
  - Must contain at least ONE text layer somewhere inside
  - This will be cloned for each row of data

### ✅ Step 4: Style Everything

Design your headers and cells however you want:
- [ ] Colors, backgrounds, borders
- [ ] Fonts, sizes, weights
- [ ] Icons, badges, effects
- [ ] Padding, spacing
- [ ] Rounded corners, shadows

The plugin will preserve ALL of this!

### ✅ Step 5: Run Plugin

- [ ] Select the main container frame
- [ ] Run: `Plugins → Development → CSV Table Populator`
- [ ] Upload your CSV
- [ ] Click "Populate Table"
- [ ] Done! 🎉

## 🎯 Pro Tips

### Tip 1: Start Small
Test with just 2-3 columns first:
```
Main Frame
├── record_id (column)
│   ├── Header
│   └── Cell
└── deal_size (column)
    ├── Header
    └── Cell
```

### Tip 2: Use Components
Make your headers and cells **components**:
- Easier to update styling globally
- Can use variants for different states
- More maintainable

### Tip 3: Test with Small Data
Before running on 100 rows:
- Create a small test CSV with 2-3 rows
- Verify everything works
- Then use your full dataset

### Tip 4: Cell Text Placement
The plugin will find the FIRST text layer in your cell and update it.

**Simple cell:**
```
Frame
└── Text ← This gets updated
```

**Complex cell:**
```
Frame (Auto-layout)
├── Icon
├── Text ← This gets updated (first text found)
└── Text (subtitle) ← This stays unchanged
```

If you want to update multiple text fields, you'll need to modify the plugin code.

### Tip 5: Re-running the Plugin
You can re-run the plugin multiple times:
- It will **delete** old cells (everything after the template)
- It will **create** new cells with updated data
- Headers and cell templates are preserved

## 🔍 Troubleshooting

### "No column frames found"
**Problem:** Column names don't match CSV headers

**Solution:**
1. Open your CSV and check exact header names
2. Rename your Figma column frames to match EXACTLY
3. Check for typos, spaces, and case differences

### "Please select the table container frame"
**Problem:** Wrong selection or nothing selected

**Solution:**
1. Click the main container frame (the horizontal auto-layout one)
2. Make sure you see it selected in the layers panel
3. Run plugin again

### Text not updating
**Problem:** No text layer found in cell

**Solution:**
1. Make sure your cell template has a text layer
2. Check that it's not in a locked group
3. Text layer can be nested - plugin searches recursively

### Weird spacing
**Problem:** Auto-layout settings

**Solution:**
1. Select column frames
2. Adjust "Space between items" 
3. Set padding if needed
4. Use "Hug contents" or "Fixed" sizing

## 📊 Example with Your CSV

Your CSV (`commission_anomaly_detection_sample.csv`):
```csv
record_id,deal_size,commission_payout,commission_rate,days_to_close,products_sold,discount_applied,rep_tenure_months,anomaly_score,is_anomaly
```

Your Figma structure should have column frames named:
- `record_id`
- `deal_size`
- `commission_payout`
- `commission_rate`
- `days_to_close`
- `products_sold`
- `discount_applied`
- `rep_tenure_months`
- `anomaly_score`
- `is_anomaly`

You don't need ALL of them - just create column frames for the ones you want to display!

## 🎨 Design Ideas for Your Data

### For "is_anomaly" column:
```
Cell with conditional styling:
- Green badge for "Normal"
- Red badge for "Anomaly"
- Add icons: ✓ or ⚠️
```

### For "commission_payout" column:
```
Cell with:
- Dollar sign
- Bold numbers
- Right-aligned text
- Different background for high amounts
```

### For "anomaly_score" column:
```
Cell with:
- Progress bar background
- Color gradient (green → red)
- Centered text
```

---

Need help? Check README.md for more details!

