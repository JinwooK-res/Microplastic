/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FoodConfig, FoodKey, UserIntakes } from "./types";

export const MP_CONCENTRATION: Record<FoodKey, FoodConfig> = {
  salt: {
    name_kr: "소금",
    name_en: "Salt",
    value: 0.512,
    unit: "p/g",
    medianValue: 0.22,
    particleSizeGeomeanUm: 58.04,
    sourceStatistic: "arithmetic mean",
    sourceTable: "Table S14",
    description: "천일염, 천연 암염 및 정제 소금에 함유된 미세플라스틱",
    description_en: "Microplastics found in sea salt, rock salt, and refined table salt",
    defaultVal: 17.2,
    min: 0,
    max: 100,
    step: 0.1
  },
  fish_sauce: {
    name_kr: "액젓",
    name_en: "Fish Sauce",
    value: 0.95,
    unit: "p/g",
    medianValue: 0.60,
    particleSizeGeomeanUm: 111.04,
    sourceStatistic: "arithmetic mean",
    sourceTable: "Table S14",
    description: "멸치액젓, 까나리액젓 등 발효 어장류",
    description_en: "Fermented fish sauces such as anchovy and sand lance sauces",
    defaultVal: 1.14,
    min: 0,
    max: 100,
    step: 0.01
  },
  salted_seafood: {
    name_kr: "젓갈",
    name_en: "Salted Fermented Seafood",
    value: 5.30,
    unit: "p/g",
    medianValue: 5.30,
    particleSizeGeomeanUm: 103.98,
    sourceStatistic: "arithmetic mean",
    sourceTable: "Table S14",
    description: "오징어젓, 낙지젓, 명란젓 등 해산물 염장 가공품",
    description_en: "Salted seafood delicacies including salted squid, octopus, and pollock roe (Jeotgal)",
    defaultVal: 1.26,
    min: 0,
    max: 200,
    step: 0.01
  },
  seaweed: {
    name_kr: "해조류",
    name_en: "Seaweed",
    value: 4.51,
    unit: "p/g",
    medianValue: 4.00,
    particleSizeGeomeanUm: 121.30,
    sourceStatistic: "arithmetic mean",
    sourceTable: "Table S14",
    description: "미역, 다시마, 김 등 바다에서 채취한 다당류 식물군",
    description_en: "Edible sea vegetables including brown seaweed (Wakame), kelp, and laver (Gim)",
    defaultVal: 5.43,
    min: 0,
    max: 300,
    step: 0.01
  },
  honey: {
    name_kr: "꿀",
    name_en: "Honey",
    value: 0.25,
    unit: "p/g",
    medianValue: 0.18,
    particleSizeGeomeanUm: 72.27,
    sourceStatistic: "arithmetic mean",
    sourceTable: "Table S14",
    description: "벌이 수집하는 과정 및 대기 중에서 혼입되는 미세 입자",
    description_en: "Natural honey containing particles accumulated during foraging and atmospheric settling",
    defaultVal: 2.50,
    min: 0,
    max: 100,
    step: 0.01
  },
  soy_sauce: {
    name_kr: "간장",
    name_en: "Soy Sauce",
    value: 36.0,
    unit: "p/L",
    medianValue: 30.0,
    particleSizeGeomeanUm: 76.88,
    sourceStatistic: "arithmetic mean",
    sourceTable: "Table S14",
    description: "대량 유통 및 조미 과정에서 발견되는 액상 장류",
    description_en: "Liquid brewed and blended soy sauce seasonings",
    defaultVal: 0.0451,
    min: 0,
    max: 2.0,
    step: 0.0001
  },
  beer: {
    name_kr: "맥주",
    name_en: "Beer",
    value: 11.4,
    unit: "p/L",
    medianValue: 9.0,
    particleSizeGeomeanUm: 99.98,
    sourceStatistic: "arithmetic mean",
    sourceTable: "Table S14",
    description: "양조 용수 및 병입 과정에서 미량 검출되는 입자",
    description_en: "Commercial beers with trace particles from brewing water and packaging",
    defaultVal: 0.445,
    min: 0,
    max: 10.0,
    step: 0.001
  },
  soft_drink: {
    name_kr: "탄산·청량음료",
    name_en: "Soft Drinks",
    value: 2.50,
    unit: "p/L",
    medianValue: 2.25,
    particleSizeGeomeanUm: 82.09,
    sourceStatistic: "arithmetic mean",
    sourceTable: "Table S14",
    description: "논문에서 분석한 탄산음료 및 청량음료",
    description_en: "Carbonated and other soft drinks analyzed in the study",
    defaultVal: 0.356,
    min: 0,
    max: 10.0,
    step: 0.001
  },
  fruit_drink: {
    name_kr: "과일음료",
    name_en: "Fruit Drinks",
    value: 37.30,
    unit: "p/L",
    medianValue: 29.30,
    particleSizeGeomeanUm: 73.92,
    sourceStatistic: "arithmetic mean",
    sourceTable: "Table S14",
    description: "과육 또는 과즙을 포함한 포장 과일음료",
    description_en: "Packaged fruit drinks containing juice or pulp",
    defaultVal: 0.183,
    min: 0,
    max: 10.0,
    step: 0.001
  },
  bottled_tea: {
    name_kr: "병입 차음료",
    name_en: "Bottled Tea",
    value: 0.25,
    unit: "p/L",
    medianValue: 0,
    particleSizeGeomeanUm: 101.68,
    sourceStatistic: "arithmetic mean",
    sourceTable: "Table S14",
    description: "논문에서 분석한 병입 액상 차음료",
    description_en: "Ready-to-drink bottled tea analyzed in the study",
    defaultVal: 0.147,
    min: 0,
    max: 10.0,
    step: 0.001
  }
};

export const INITIAL_INTAKES: UserIntakes = {
  salt: 17.2,
  fish_sauce: 1.14,
  salted_seafood: 1.26,
  seaweed: 5.43,
  honey: 2.50,
  soy_sauce: 0.0451,
  beer: 0.445,
  soft_drink: 0.356,
  fruit_drink: 0.183,
  bottled_tea: 0.147
};

export const MICROPLASTIC_TIPS = [
  {
    title_kr: "소금 유형별 차이 확인",
    title_en: "Interpret Salt Types Separately",
    desc_kr: "해당 연구에서는 천일염의 중앙값이 죽염·정제염보다 높았지만, 제품 수와 제조공정의 차이를 고려해 개인 위험으로 단정하지 않아야 합니다.",
    desc_en: "Sea salt had a higher median count than bamboo and refined salts in this dataset, but product and process differences should not be interpreted as an individual health-risk threshold."
  },
  {
    title_kr: "해조류 조리 전 철저한 세척",
    title_en: "Rinse Dried Seaweed Thoroughly Before Cooking",
    desc_kr: "미역, 다시마 등의 해조류는 물에 씻는 과정에서 표면에 묻어 있던 상당수의 미세플라스틱 입자가 씻겨 나가므로, 흐르는 물에 여러 번 씻는 것이 아주 중요합니다.",
    desc_en: "In the study's preparation experiment, washing dried seaweed and kelp twice reduced measured particles by 70% and 84%, respectively; results may not generalize to every product."
  }
];

export const PYTHON_STREAMLIT_CODE = `import streamlit as st
import pandas as pd

# Deterministic parameters from Table S14 of Pham et al. (2023).
# Liquid concentrations are expressed per liter and liquid intakes per liter.
MP_CONCENTRATION = {
    "salt": {"name": "Salt", "value": 0.512, "unit": "p/g", "size_um": 58.04, "default": 17.2, "desc": "Table salt"},
    "fish_sauce": {"name": "Fish Sauce", "value": 0.95, "unit": "p/g", "size_um": 111.04, "default": 1.14, "desc": "Fermented fish sauces"},
    "salted_seafood": {"name": "Salted Seafood", "value": 5.30, "unit": "p/g", "size_um": 103.98, "default": 1.26, "desc": "Salted seafood products"},
    "seaweed": {"name": "Seaweed", "value": 4.51, "unit": "p/g", "size_um": 121.30, "default": 5.43, "desc": "Kelp, seaweed, and laver"},
    "honey": {"name": "Honey", "value": 0.25, "unit": "p/g", "size_um": 72.27, "default": 2.50, "desc": "Honey products"},
    "soy_sauce": {"name": "Soy Sauce", "value": 36.0, "unit": "p/L", "size_um": 76.88, "default": 0.0451, "desc": "Soy sauce products"},
    "beer": {"name": "Beer", "value": 11.4, "unit": "p/L", "size_um": 99.98, "default": 0.445, "desc": "Domestic and imported beer"},
    "soft_drink": {"name": "Soft Drinks", "value": 2.50, "unit": "p/L", "size_um": 82.09, "default": 0.356, "desc": "Carbonated and soft drinks"},
    "fruit_drink": {"name": "Fruit Drinks", "value": 37.30, "unit": "p/L", "size_um": 73.92, "default": 0.183, "desc": "Packaged fruit drinks"},
    "bottled_tea": {"name": "Bottled Tea", "value": 0.25, "unit": "p/L", "size_um": 101.68, "default": 0.147, "desc": "Ready-to-drink bottled tea"}
}

# Streamlit Page Config
st.set_page_config(
    page_title="Weekly Microplastics Exposure Calculator",
    page_icon="⚠️",
    layout="wide"
)

# Custom Styling for Bento Feel
st.markdown("""
<style>
    .bento-card {
        background-color: #ffffff;
        border-radius: 16px;
        padding: 20px;
        border: 1px solid #e2e8f0;
        box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        margin-bottom: 20px;
    }
    .ref-card {
        background-color: #f8fafc;
        border-radius: 12px;
        padding: 15px;
        border: 1px solid #cbd5e1;
        border-left: 5px solid #6366f1;
        margin-top: 15px;
    }
</style>
""", unsafe_allow_html=True)

# 2. Header & Overview
st.markdown("### 🧬 Environmental Health Tracker")
st.title("⚠️ Weekly Microplastics Exposure Calculator")
st.markdown("Quantify your weekly dietary microplastic ingestion based on empirical food concentration data. Adjust your consumption sliders to diagnose aggregate exposure in real time.")

st.markdown("---")

# Layout: Two Columns (Inputs & Results)
col_left, col_right = st.columns([6, 5])

user_inputs = {}

with col_left:
    st.subheader("📊 Weekly Dietary Food Intake Settings")
    
    sub_col1, sub_col2 = st.columns(2)
    
    with sub_col1:
        st.markdown("#### 🌾 Solid Foods (grams/week)")
        user_inputs["salt"] = st.slider(
            "🧂 Salt (g/week)",
            min_value=0.0, max_value=100.0, value=17.2, step=0.1,
            help=MP_CONCENTRATION["salt"]["desc"]
        )
        user_inputs["fish_sauce"] = st.slider(
            "🐟 Fish Sauce (g/week)",
            min_value=0.0, max_value=100.0, value=1.14, step=0.01,
            help=MP_CONCENTRATION["fish_sauce"]["desc"]
        )
        user_inputs["salted_seafood"] = st.slider(
            "🦐 Salted Seafood (g/week)",
            min_value=0.0, max_value=200.0, value=1.26, step=0.01,
            help=MP_CONCENTRATION["salted_seafood"]["desc"]
        )
        user_inputs["seaweed"] = st.slider(
            "🌿 Seaweed (g/week)",
            min_value=0.0, max_value=300.0, value=5.43, step=0.01,
            help=MP_CONCENTRATION["seaweed"]["desc"]
        )
        user_inputs["honey"] = st.slider(
            "🍯 Honey (g/week)",
            min_value=0.0, max_value=100.0, value=2.50, step=0.01,
            help=MP_CONCENTRATION["honey"]["desc"]
        )

    with sub_col2:
        st.markdown("#### 🍹 Liquid Foods (liters/week)")
        user_inputs["soy_sauce"] = st.slider(
            "🧴 Soy Sauce (L/week)",
            min_value=0.0, max_value=2.0, value=0.0451, step=0.0001,
            help=MP_CONCENTRATION["soy_sauce"]["desc"]
        )
        user_inputs["beer"] = st.slider(
            "🍺 Beer (L/week)",
            min_value=0.0, max_value=10.0, value=0.445, step=0.001,
            help=MP_CONCENTRATION["beer"]["desc"]
        )
        user_inputs["soft_drink"] = st.slider(
            "🥤 Soft Drinks (L/week)", 0.0, 10.0, 0.356, 0.001,
            help=MP_CONCENTRATION["soft_drink"]["desc"]
        )
        user_inputs["fruit_drink"] = st.slider(
            "🧃 Fruit Drinks (L/week)", 0.0, 10.0, 0.183, 0.001,
            help=MP_CONCENTRATION["fruit_drink"]["desc"]
        )
        user_inputs["bottled_tea"] = st.slider(
            "🍵 Bottled Tea (L/week)", 0.0, 10.0, 0.147, 0.001,
            help=MP_CONCENTRATION["bottled_tea"]["desc"]
        )

# 3. Calculation Logic
exposure_data = []
total_particles = 0.0
total_mass_ug = 0.0

for key, config in MP_CONCENTRATION.items():
    intake = user_inputs[key]
    concentration = config["value"]
    exposure = concentration * intake
    particle_mass_ug = 3.141592653589793 * config["size_um"] ** 3 * 0.98 / (6 * 10**12) * 10**6
    mass_ug = exposure * particle_mass_ug
    total_particles += exposure
    total_mass_ug += mass_ug
    
    exposure_data.append({
        "key": key,
        "Food Category": config["name"],
        "Intake": intake,
        "Unit": "g" if config["unit"] == "p/g" else "L",
        "Concentration": concentration,
        "Conc Unit": config["unit"],
        "Weekly Exposure (particles)": exposure
        ,"Estimated Mass (ug)": mass_ug
    })

df = pd.DataFrame(exposure_data)
if total_particles > 0:
    df["Share (%)"] = (df["Weekly Exposure (particles)"] / total_particles) * 100
else:
    df["Share (%)"] = 0.0

# Sort descending
df_sorted = df.sort_values(by="Weekly Exposure (particles)", ascending=False)
worst_row = df_sorted.iloc[0] if total_particles > 0 else None

with col_right:
    st.subheader("🔍 Exposure Diagnosis Results")
    
    # Bento Metric Card
    st.markdown(f"""
    <div style="background-color: #0f172a; color: #ffffff; border-radius: 24px; padding: 25px; text-align: center; border: 1px solid #1e293b; position: relative;">
        <span style="background-color: rgba(245, 158, 11, 0.1); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.2); padding: 4px 10px; border-radius: 9999px; font-size: 11px; font-weight: 900; letter-spacing: 1px;">
            TOTAL WEEKLY EXPOSURE
        </span>
        <h1 style="color: #fbbf24; font-size: 55px; font-weight: 900; margin: 15px 0 5px 0; font-family: sans-serif;">
            {total_particles:,.1f}
        </h1>
        <p style="color: #94a3b8; font-size: 14px; font-weight: bold;">particles / week</p>
        <p style="color: #64748b; font-size: 12px; line-height: 1.5; max-width: 350px; margin: 10px auto 0 auto;">
            Estimated microplastic particles ingested directly through monitored food groups during the week.
        </p>
        <hr style="border-color: #1e293b; margin: 20px 0 15px 0;">
        <span style="color: #64748b; font-size: 10px; font-weight: bold; text-transform: uppercase;">Estimated Mass</span>
        <span style="color: #e2e8f0; font-size: 14px; font-weight: 900; display: block; margin-top: 3px;">~{total_mass_ug:.2f} μg/week</span>
        <span style="color: #64748b; font-size: 10px; display: block; margin-top: 3px;">Food-specific size; sphere and 0.98 g/mL assumptions</span>
    </div>
    """, unsafe_allow_html=True)
    
    if total_particles > 0 and worst_row is not None:
        st.warning(f"⚠️ **Primary Exposure Vector:** The single largest contributor is **[{worst_row['Food Category']}]**, representing **{worst_row['Share (%)']:.1f}%** of your total intake.")
    else:
        st.info("💡 **Guide:** Adjust dietary intake levels to compute exposure metrics.")

st.markdown("---")

col_bottom_left, col_bottom_right = st.columns([6, 5])

with col_bottom_left:
    st.subheader("📊 Category Share (Top Exposure)")
    
    df_chart = df_sorted[df_sorted["Weekly Exposure (particles)"] > 0]
    if not df_chart.empty:
        for idx, row in df_chart.head(4).iterrows():
            st.markdown(f"**{row['Food Category']}** - {row['Weekly Exposure (particles)']:.1f} p ({row['Share (%)']:.1f}%)")
            st.progress(float(row['Share (%)'] / 100.0))
    else:
        st.info("No exposure recorded.")
        
    with st.expander("📝 Detailed Exposure Breakdown Table"):
        st.dataframe(
            df_sorted[["Food Category", "Concentration", "Conc Unit", "Intake", "Unit", "Weekly Exposure (particles)", "Share (%)"]],
            use_container_width=True,
            hide_index=True
        )

with col_bottom_right:
    st.subheader("💡 Practical Exposure Reduction Guidelines")
    st.success("""
    1. **Interpret salt types separately**: Sea salt had a higher median count than bamboo and refined salts in this dataset; this is not a health-risk threshold.
    2. **Rinse dried seaweed**: In this experiment, washing dried seaweed and kelp twice reduced measured particles by 70% and 84%, respectively. Results may not generalize to every product.
    """)

st.info("This tool estimates dietary exposure under study-specific assumptions. It does not determine individual health risk or a safe/harmful threshold.")

# Academic Research Citation
st.markdown("""
<div class="ref-card">
    <p style="margin: 0; font-size: 12px; font-weight: bold; color: #1e1b4b;">📖 Academic Peer-Reviewed Reference</p>
    <p style="margin: 5px 0 2px 0; font-size: 14px; font-weight: bold; color: #1e293b; font-family: sans-serif;">
        "Analysis of microplastics in various foods and assessment of aggregate human exposure via food consumption in Korea"
    </p>
    <p style="margin: 0; font-size: 11px; color: #475569;">
        Dat Thanh Pham, <b>Jinwoo Kim</b>, Sang-Hwa Lee, Juyang Kim, Dowoon Kim, Soonki Hong, Jaehak Jung, Jung-Hwan Kwon
    </p>
    <p style="margin: 3px 0 0 0; font-size: 11px; font-family: monospace; color: #64748b;">
        Environmental Pollution 322 (2023) 121153 | DOI: <a href="https://doi.org/10.1016/j.envpol.2023.121153" target="_blank" style="color: #6366f1; text-decoration: none; font-weight: bold;">10.1016/j.envpol.2023.121153</a>
    </p>
</div>
""", unsafe_allow_html=True)

st.markdown("---")
st.caption("Weekly Microplastics Exposure Calculator | Bento Grid Theme Streamlit MVP App | Scientific Aggregate Intake Model")
`;
