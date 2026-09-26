# Weekly Microplastics Exposure Calculator

An interactive dietary microplastics **exposure** calculator based on the deterministic parameters reported by Pham et al. (2023). The project includes a React dashboard, a Streamlit companion, and an optional Gemini-powered exposure explainer.

> Pham, D. T., Kim, J., Lee, S.-H., Kim, J., Kim, D., Hong, S., Jung, J., & Kwon, J.-H. (2023). Analysis of microplastics in various foods and assessment of aggregate human exposure via food consumption in Korea. *Environmental Pollution*, 322, 121153. https://doi.org/10.1016/j.envpol.2023.121153

## Scientific scope

The default inputs reproduce the deterministic parameters for the ten calculation categories derived from the study's eight measured food types. Concentrations use the arithmetic means in Supplementary Table S14; liquid concentrations are expressed per liter and liquid intakes per liter.

| Category | Concentration | Mean weekly intake | Geometric-mean particle size |
| --- | ---: | ---: | ---: |
| Salt | 0.512 p/g | 17.2 g | 58.04 μm |
| Soy sauce | 36.0 p/L | 0.0451 L | 76.88 μm |
| Fish sauce | 0.95 p/g | 1.14 g | 111.04 μm |
| Salted seafood | 5.30 p/g | 1.26 g | 103.98 μm |
| Seaweed | 4.51 p/g | 5.43 g | 121.30 μm |
| Beer | 11.4 p/L | 0.445 L | 99.98 μm |
| Soft drinks | 2.50 p/L | 0.356 L | 82.09 μm |
| Fruit drinks | 37.30 p/L | 0.183 L | 73.92 μm |
| Bottled tea | 0.25 p/L | 0.147 L | 101.68 μm |
| Honey | 0.25 p/g | 2.50 g | 72.27 μm |

Particle exposure is calculated as:

```text
particles/week = concentration × weekly intake
```

Mass is calculated separately for each category using Equation 2 of the paper:

```text
AMM (g/particle) = π × L³ × ρ / (6 × 10¹²)
mass/week = particles/week × AMM
```

where `L` is the category-specific geometric-mean particle size in μm and `ρ = 0.98 g/mL`. The earlier universal `0.002 mg/particle` and credit-card conversion have been removed.

The default measured-food subtotal is approximately **56.13 particles/week** and **32.71 μg/week**. It must not be directly compared with the paper's 13-category aggregate result, which additionally includes fish, shellfish, and water.

> This application estimates dietary exposure under study-specific assumptions. It does not establish an individual health risk, causal health effect, or safe/harmful threshold.

## Run the React application

Requirements: Node.js 20+ and npm.

```bash
git clone https://github.com/JinwooK-res/Microplastic.git
cd Microplastic
npm ci
cp .env.example .env
npm run dev
```

Open `http://localhost:3000`.

Set a valid API key in `.env` to enable chat:

```env
GEMINI_API_KEY="your-gemini-api-key"
GEMINI_MODEL="gemini-3.6-flash"
```

The calculator works without Gemini; chat does not.

## Run the Streamlit companion

```bash
python -m pip install streamlit pandas
streamlit run app.py
```

## Quality checks

```bash
npm run lint
npm test
npm run build
```

The calculation tests cover the paper's particle-mass equation, the default deterministic subtotal, and zero-intake behavior.

## Limitations

- The deterministic mode uses group-level arithmetic means and mean food intakes, not individual measurements.
- The spherical-particle and uniform-density assumptions introduce uncertainty.
- Preparation and cooking may change particle abundance.
- The measured-food subtotal excludes fish, shellfish, water, inhalation, and other exposure routes.
- The chatbot explains the calculator; it is not a medical or toxicological decision system.

## License

Apache License 2.0. See [LICENSE](LICENSE).
