"""Streamlit companion for the Pham et al. (2023) deterministic model."""

import math

import pandas as pd
import streamlit as st


FOODS = {
    "Salt": (0.512, "p/g", 17.2, "g", 58.04),
    "Fish sauce": (0.95, "p/g", 1.14, "g", 111.04),
    "Salted seafood": (5.30, "p/g", 1.26, "g", 103.98),
    "Seaweed": (4.51, "p/g", 5.43, "g", 121.30),
    "Honey": (0.25, "p/g", 2.50, "g", 72.27),
    "Soy sauce": (36.0, "p/L", 0.0451, "L", 76.88),
    "Beer": (11.4, "p/L", 0.445, "L", 99.98),
    "Soft drinks": (2.50, "p/L", 0.356, "L", 82.09),
    "Fruit drinks": (37.30, "p/L", 0.183, "L", 73.92),
    "Bottled tea": (0.25, "p/L", 0.147, "L", 101.68),
}


def particle_mass_micrograms(size_um: float, density_g_ml: float = 0.98) -> float:
    """Equation 2: spherical-particle mass from geometric-mean size."""
    return math.pi * size_um**3 * density_g_ml / (6 * 10**12) * 10**6


st.set_page_config(page_title="Microplastics Exposure Calculator", page_icon="🔬")
st.title("Weekly Dietary Microplastics Exposure")
st.caption("Deterministic parameters from Table S14, Pham et al. (2023)")

rows = []
for name, (concentration, concentration_unit, default, intake_unit, size_um) in FOODS.items():
    step = 0.1 if intake_unit == "g" else 0.001
    intake = st.number_input(
        f"{name} ({intake_unit}/week)",
        min_value=0.0,
        value=float(default),
        step=step,
    )
    particles = concentration * intake
    mass_ug = particles * particle_mass_micrograms(size_um)
    rows.append(
        {
            "Food": name,
            "Concentration": concentration,
            "Concentration unit": concentration_unit,
            "Weekly intake": intake,
            "Intake unit": intake_unit,
            "Particles/week": particles,
            "Mass (μg/week)": mass_ug,
        }
    )

result = pd.DataFrame(rows)
col1, col2 = st.columns(2)
col1.metric("Particles/week", f"{result['Particles/week'].sum():.2f}")
col2.metric("Mass (μg/week)", f"{result['Mass (μg/week)'].sum():.2f}")
st.dataframe(result, hide_index=True, use_container_width=True)

st.warning(
    "This tool estimates dietary exposure under study-specific assumptions. "
    "It does not determine individual health risk or a safe/harmful threshold."
)
st.markdown("Source: [Pham et al. (2023)](https://doi.org/10.1016/j.envpol.2023.121153)")
