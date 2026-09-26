# Microplastics Dietary Exposure Calculator

An interactive dietary microplastics **exposure** calculator based on the deterministic parameters reported by Pham et al. (2023).

The project reproduces the published exposure calculation in a transparent and testable form using a React dashboard, a Streamlit companion, and an optional Gemini-powered explainer.

> Pham, D. T., Kim, J., Lee, S.-H., Kim, J., Kim, D., Hong, S., Jung, J., & Kwon, J.-H. (2023). Analysis of microplastics in various foods and assessment of aggregate human exposure via food consumption in Korea. *Environmental Pollution*, 322, 121153.
> https://doi.org/10.1016/j.envpol.2023.121153

---

## What It Does

The default inputs reproduce ten calculation categories derived from the eight measured food types reported in the study.

The model explicitly separates:

* microplastic concentration,
* weekly food intake,
* geometric-mean particle size, and
* particle density.

This allows the contribution of each parameter to the exposure estimate to be inspected directly.

The default measured-food subtotal is approximately:

* **56.13 particles/week**
* **32.71 μg/week**

This subtotal excludes fish, shellfish, and water and should not be directly compared with the paper's 13-category aggregate result.

> This application estimates dietary exposure under the assumptions used in the source study. It does not establish individual health risk, causal health effects, or safe/harmful exposure thresholds.

---

## Calculation

Particle-number exposure is calculated for each category as:

```text
particles/week = concentration × weekly intake
```

Particle mass is calculated using Equation 2 of the paper:

```text
AMM (g/particle) = π × L³ × ρ / (6 × 10¹²)

mass/week = particles/week × AMM
```

where:

* `L` = category-specific geometric-mean particle size in μm
* `ρ = 0.98 g/mL`

Mass is calculated independently for each category using its own particle-size parameter.

The earlier universal `0.002 mg/particle` conversion and credit-card-equivalent comparison have been removed.

---

## Run the React Application

Requirements:

* Node.js 20+
* npm

```bash
git clone https://github.com/JinwooK-res/microplastics-exposure-calculator.git
cd microplastics-exposure-calculator
npm ci
cp .env.example .env
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## Optional Gemini Explainer

Set a valid API key in `.env`:

```env
GEMINI_API_KEY="your-gemini-api-key"
GEMINI_MODEL="gemini-3.8-flash"
```

The calculator works without Gemini.

The language-model component only explains calculator outputs and does not participate in the numerical exposure calculations.

---

## Streamlit Companion

```bash
python -m pip install streamlit pandas
streamlit run app.py
```

---

## Quality Checks

```bash
npm run lint
npm test
npm run build
```

Automated tests currently cover:

* the particle-mass equation,
* reproduction of the default deterministic subtotal, and
* zero-intake behavior.

---

## Limitations

* The model uses group-level arithmetic mean concentrations and mean food-intake values.
* Particle mass estimates assume spherical particles and a uniform density.
* Preparation and cooking may alter particle abundance.
* The current subtotal excludes fish, shellfish, water, inhalation, and other exposure routes.
* The model reproduces a specific published exposure calculation and does not estimate toxicological effects or health risk.

---

## Future Development

Possible future extensions include:

* incorporating additional exposure studies,
* comparing analytical methods and particle-size ranges,
* harmonizing units and food categories,
* structuring study metadata and uncertainty information, and
* exploring controlled vocabularies, ontologies, or knowledge graphs for organizing exposure data.

These features are not implemented in the current version.

---

## Intended Use

This repository is a personal research and software-development project intended for research exploration, reproducibility, and computational prototyping.

It does not represent the official views or activities of Korea Conformity Laboratories (KCL).

---

## License

Apache License 2.0. See [LICENSE](LICENSE).
