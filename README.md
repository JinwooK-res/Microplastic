# Weekly Microplastics Exposure Calculator & Bento Dashboard 🔬

An interactive dietary microplastics exposure assessment tool and analytical dashboard built with **React**, **Tailwind CSS**, **Streamlit (Python)**, and **Google Gemini 3.8 Flash**.

Based on empirical data and exposure modeling from the peer-reviewed study:
> **Pham, D. T., Kim, J., Lee, S.-H., Kim, J., Kim, D., Hong, S., Jung, J., & Kwon, J.-H. (2023).**  
> *"Analysis of microplastics in various foods and assessment of aggregate human exposure via food consumption in Korea."*  
> **Environmental Pollution**, 322, 121153. [https://doi.org/10.1016/j.envpol.2023.121153](https://doi.org/10.1016/j.envpol.2023.121153)

---

## 🌟 Key Features

1. **Bento Grid Analytical Dashboard**:
   - Modern, high-density Bento Grid interface with dark and light card archetypes.
   - Interactive sliders and numeric inputs calibrated for solid foods (grams, $g$) and liquid foods (liters, $L$).
   - Real-time exposure calculations using standard matrix multiplication:
     $$\text{Weekly Exposure (particles)} = \sum (\text{Concentration}_i \times \text{Intake}_i)$$

2. **Empirical Food Concentrations ($MP\_CONCENTRATION$)**:
   - **Table Salt**: $0.29 \text{ particles/g}$
   - **Soy Sauce**: $0.09 \text{ particles/mL}$ ($90 \text{ particles/L}$)
   - **Fish Sauce**: $0.63 \text{ particles/mL}$ ($630 \text{ particles/L}$)
   - **Salted Fermented Seafood**: $0.21 \text{ particles/g}$
   - **Seaweed (Wakame/Kelp)**: $4.47 \text{ particles/g}$
   - **Natural Honey**: $0.18 \text{ particles/g}$
   - **Beer**: $0.01 \text{ particles/mL}$ ($10 \text{ particles/L}$)
   - **Bottled Soft Drinks & Beverages**: $0.004 \text{ particles/mL}$ ($4 \text{ particles/L}$)

3. **Risk Contextualization**:
   - Compares total ingested particles to estimated mass ($\approx 0.002\text{ mg}$ per particle).
   - Provides objective perspectives comparing empirical findings with sensationalized media claims (such as "eating a credit card per week").

4. **AI Exposure Explainer Chatbot (Gemini 3.8 Flash)**:
   - Evaluates user-specific numbers in real-time.
   - Answers questions regarding toxicology, particle size distributions (PE, PP, PET under $300\mu\text{m}$), and kitchen preparation reduction methods.

5. **Standalone Streamlit Python MVP (`app.py`)**:
   - Embedded exportable Python script ready for single-file local deployment with Streamlit and Matplotlib.

---

## 🚀 Running the Web Application (React + Node.js)

### Prerequisites
- Node.js 18+ or 20+
- npm

### Installation
```bash
# Clone repository
git clone https://github.com/your-username/microplastics-exposure-calculator.git
cd microplastics-exposure-calculator

# Install dependencies
npm install
```

### Environment Variables
Create a `.env` file (see `.env.example`):
```env
GEMINI_API_KEY="your-gemini-api-key"
```

### Run Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000`.

---

## 🐍 Running the Python Streamlit Version (`app.py`)

A standalone Python Streamlit app is included. You can run it directly:

```bash
# Install Python dependencies
pip install streamlit pandas matplotlib

# Run the Streamlit application
streamlit run app.py
```

Or view and copy the complete Python source code directly from the **Streamlit Python Code** tab in the web dashboard!

---

## 💡 Practical Microplastic Reduction Tips

- **Rinse Dried Seaweed**: Rinsing dried wakame or kelp 2 to 3 times thoroughly under running tap water eliminates **70% to 84%** of attached microplastics.
- **Choose Purified Salt**: Well-filtered vacuum-evaporated table salt or deep rock salt generally exhibits lower particle counts than open-air unrefined sea salt.
- **Glass & Stainless Steel Storage**: Avoid microwaving or storing hot, oily, or acidic sauces in single-use plastic containers.
- **Tap Water Filtration**: Using carbon block or reverse osmosis filters significantly reduces tap and beverage microplastic loads.

---

## 📄 Academic Reference
```bibtex
@article{pham2023analysis,
  title={Analysis of microplastics in various foods and assessment of aggregate human exposure via food consumption in Korea},
  author={Pham, Dat Thanh and Kim, Jinwoo and Lee, Sang-Hwa and Kim, Juyang and Kim, Dowoon and Hong, Soonki and Jung, Jaehak and Kwon, Jung-Hwan},
  journal={Environmental Pollution},
  volume={322},
  pages={121153},
  year={2023},
  publisher={Elsevier},
  doi={10.1016/j.envpol.2023.121153}
}
```

---

## 🛡️ License
MIT License. Created for environmental health awareness and scientific education.
