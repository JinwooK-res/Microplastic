/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FoodConfig, FoodKey, UserIntakes } from "./types";

export const MP_CONCENTRATION: Record<FoodKey, FoodConfig> = {
  salt: {
    name_kr: "소금",
    name_en: "Salt",
    value: 0.22,
    unit: "p/g",
    description: "천일염, 천연 암염 및 정제 소금에 함유된 미세플라스틱",
    description_en: "Microplastics found in sea salt, rock salt, and refined table salt",
    defaultVal: 10,
    min: 0,
    max: 100,
    step: 1
  },
  fish_sauce: {
    name_kr: "액젓",
    name_en: "Fish Sauce",
    value: 0.60,
    unit: "p/g",
    description: "멸치액젓, 까나리액젓 등 발효 어장류",
    description_en: "Fermented fish sauces such as anchovy and sand lance sauces",
    defaultVal: 5,
    min: 0,
    max: 100,
    step: 1
  },
  salted_seafood: {
    name_kr: "젓갈",
    name_en: "Salted Fermented Seafood",
    value: 5.30,
    unit: "p/g",
    description: "오징어젓, 낙지젓, 명란젓 등 해산물 염장 가공품",
    description_en: "Salted seafood delicacies including salted squid, octopus, and pollock roe (Jeotgal)",
    defaultVal: 15,
    min: 0,
    max: 200,
    step: 5
  },
  seaweed: {
    name_kr: "해조류",
    name_en: "Seaweed",
    value: 4.00,
    unit: "p/g",
    description: "미역, 다시마, 김 등 바다에서 채취한 다당류 식물군",
    description_en: "Edible sea vegetables including brown seaweed (Wakame), kelp, and laver (Gim)",
    defaultVal: 20,
    min: 0,
    max: 300,
    step: 5
  },
  honey: {
    name_kr: "꿀",
    name_en: "Honey",
    value: 0.18,
    unit: "p/g",
    description: "벌이 수집하는 과정 및 대기 중에서 혼입되는 미세 입자",
    description_en: "Natural honey containing particles accumulated during foraging and atmospheric settling",
    defaultVal: 10,
    min: 0,
    max: 100,
    step: 1
  },
  soy_sauce: {
    name_kr: "간장",
    name_en: "Soy Sauce",
    value: 30.0,
    unit: "p/L",
    description: "대량 유통 및 조미 과정에서 발견되는 액상 장류",
    description_en: "Liquid brewed and blended soy sauce seasonings",
    defaultVal: 0.05,
    min: 0,
    max: 2.0,
    step: 0.01
  },
  beer: {
    name_kr: "맥주",
    name_en: "Beer",
    value: 9.0,
    unit: "p/L",
    description: "양조 용수 및 병입 과정에서 미량 검출되는 입자",
    description_en: "Commercial beers with trace particles from brewing water and packaging",
    defaultVal: 1.5,
    min: 0,
    max: 10.0,
    step: 0.1
  },
  beverage: {
    name_kr: "음료",
    name_en: "Bottled Beverages",
    value: 1.75,
    unit: "p/L",
    description: "생수 및 페트병입 탄산음료, 주스 가공품류",
    description_en: "Bottled mineral water, carbonated soft drinks, and packaged juices",
    defaultVal: 2.0,
    min: 0,
    max: 15.0,
    step: 0.1
  }
};

export const INITIAL_INTAKES: UserIntakes = {
  salt: 10,
  fish_sauce: 5,
  salted_seafood: 15,
  seaweed: 20,
  honey: 10,
  soy_sauce: 0.05,
  beer: 1.5,
  beverage: 2.0
};

export const MICROPLASTIC_TIPS = [
  {
    title_kr: "정제/가공 소금 활용하기",
    title_en: "Opt for Refined or Rock Salt",
    desc_kr: "천일염 대신 상대적으로 가공이나 여과 수준이 높은 암염이나 정제 소금을 사용하면 미세플라스틱 섭취를 크게 줄일 수 있습니다.",
    desc_en: "Using well-filtered rock salt or refined table salt instead of raw sea salt can significantly lower your weekly microplastic ingestion."
  },
  {
    title_kr: "페트병 대신 텀블러 사용하기",
    title_en: "Use Reusable Stainless Steel/Glass Tumblers",
    desc_kr: "일회용 생수병이나 플라스틱 용기에 든 음료 대신 유리병에 든 제품이나 정수기 필터를 거친 물을 스테인리스/유리 텀블러에 담아 마시는 것이 효과적입니다.",
    desc_en: "Drinking filtered tap water from stainless steel or glass bottles instead of single-use PET bottled beverages effectively eliminates plastic leaching."
  },
  {
    title_kr: "해조류 조리 전 철저한 세척",
    title_en: "Rinse Dried Seaweed Thoroughly Before Cooking",
    desc_kr: "미역, 다시마 등의 해조류는 물에 씻는 과정에서 표면에 묻어 있던 상당수의 미세플라스틱 입자가 씻겨 나가므로, 흐르는 물에 여러 번 씻는 것이 아주 중요합니다.",
    desc_en: "Rinsing dried seaweeds (kelp, wakame) 2–3 times under running tap water washes away 70% to 84% of adhering microplastic particles."
  },
  {
    title_kr: "플라스틱 주방용품 멀리하기",
    title_en: "Minimize Heated Plastic Cookware",
    desc_kr: "뜨거운 국이나 찌개를 조리할 때 플라스틱 국자나 도구를 사용하지 않고, 흠집이 많이 난 플라스틱 도마 대신 친환경 나무/유리 도마를 사용하는 것이 간접 노출을 줄여줍니다.",
    desc_en: "Avoid stirring boiling soups with plastic utensils, and replace scratched plastic cutting boards with solid wood or glass boards to cut down physical abrasion particles."
  }
];

export const PYTHON_STREAMLIT_CODE = `import streamlit as st
import pandas as pd

# 1. Dataset Configuration (Scientific Benchmark Data from Pham et al., 2023)
MP_CONCENTRATION = {
    "salt": {"name": "Salt", "value": 0.22, "unit": "p/g", "desc": "Microplastics in sea salt, rock salt, and refined salt"},
    "fish_sauce": {"name": "Fish Sauce", "value": 0.60, "unit": "p/g", "desc": "Fermented fish seasoning sauces"},
    "salted_seafood": {"name": "Salted Seafood", "value": 5.30, "unit": "p/g", "desc": "Salted fermented seafood products (Jeotgal)"},
    "seaweed": {"name": "Seaweed", "value": 4.00, "unit": "p/g", "desc": "Dried kelp, brown seaweed (Wakame), and laver (Gim)"}, 
    "honey": {"name": "Honey", "value": 0.18, "unit": "p/g", "desc": "Honey with airborne and foraging micro-particulates"},
    "soy_sauce": {"name": "Soy Sauce", "value": 30.0, "unit": "p/L", "desc": "Liquid brewed soy sauce seasoning"},
    "beer": {"name": "Beer", "value": 9.00, "unit": "p/L", "desc": "Bottled & canned commercial brewed beers"},
    "beverage": {"name": "Bottled Beverages", "value": 1.75, "unit": "p/L", "desc": "Bottled spring water, carbonated soft drinks, juices"}
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
            min_value=0.0, max_value=100.0, value=10.0, step=1.0,
            help=MP_CONCENTRATION["salt"]["desc"]
        )
        user_inputs["fish_sauce"] = st.slider(
            "🐟 Fish Sauce (g/week)",
            min_value=0.0, max_value=100.0, value=5.0, step=1.0,
            help=MP_CONCENTRATION["fish_sauce"]["desc"]
        )
        user_inputs["salted_seafood"] = st.slider(
            "🦐 Salted Seafood (g/week)",
            min_value=0.0, max_value=200.0, value=15.0, step=5.0,
            help=MP_CONCENTRATION["salted_seafood"]["desc"]
        )
        user_inputs["seaweed"] = st.slider(
            "🌿 Seaweed (g/week)",
            min_value=0.0, max_value=300.0, value=20.0, step=5.0,
            help=MP_CONCENTRATION["seaweed"]["desc"]
        )
        user_inputs["honey"] = st.slider(
            "🍯 Honey (g/week)",
            min_value=0.0, max_value=100.0, value=10.0, step=1.0,
            help=MP_CONCENTRATION["honey"]["desc"]
        )

    with sub_col2:
        st.markdown("#### 🍹 Liquid Foods (liters/week)")
        user_inputs["soy_sauce"] = st.slider(
            "🧴 Soy Sauce (L/week)",
            min_value=0.0, max_value=2.0, value=0.05, step=0.01,
            help=MP_CONCENTRATION["soy_sauce"]["desc"]
        )
        user_inputs["beer"] = st.slider(
            "🍺 Beer (L/week)",
            min_value=0.0, max_value=10.0, value=1.5, step=0.1,
            help=MP_CONCENTRATION["beer"]["desc"]
        )
        user_inputs["beverage"] = st.slider(
            "🥤 Bottled Beverages (L/week)",
            min_value=0.0, max_value=15.0, value=2.0, step=0.1,
            help=MP_CONCENTRATION["beverage"]["desc"]
        )

# 3. Calculation Logic
exposure_data = []
total_particles = 0.0

for key, config in MP_CONCENTRATION.items():
    intake = user_inputs[key]
    concentration = config["value"]
    exposure = concentration * intake
    total_particles += exposure
    
    exposure_data.append({
        "key": key,
        "Food Category": config["name"],
        "Intake": intake,
        "Unit": "g" if config["unit"] == "p/g" else "L",
        "Concentration": concentration,
        "Conc Unit": config["unit"],
        "Weekly Exposure (particles)": exposure
    })

df = pd.DataFrame(exposure_data)
if total_particles > 0:
    df["Share (%)"] = (df["Weekly Exposure (particles)"] / total_particles) * 100
else:
    df["Share (%)"] = 0.0

# Approx weight: ~0.002 mg per typical particle
plastic_weight_mg = total_particles * 0.002
credit_card_fraction = plastic_weight_mg / 5000.0  # 1 credit card = 5g (5,000 mg)

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
        <div style="display: flex; justify-content: space-around; text-align: center;">
            <div>
                <span style="color: #64748b; font-size: 10px; font-weight: bold; text-transform: uppercase;">Estimated Mass</span>
                <span style="color: #e2e8f0; font-size: 14px; font-weight: 900; display: block; margin-top: 3px;">~{plastic_weight_mg:.2f} mg</span>
            </div>
            <div style="border-left: 1px solid #1e293b;"></div>
            <div>
                <span style="color: #64748b; font-size: 10px; font-weight: bold; text-transform: uppercase;">Annual Card Eqv.</span>
                <span style="color: #fbbf24; font-size: 14px; font-weight: 900; display: block; margin-top: 3px;">~{(credit_card_fraction * 52):.2f} card/yr</span>
            </div>
        </div>
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
    1. **Choose Refined/Rock Salt**: High-filtration rock salt or refined vacuum salt has far fewer particles than unrefined sea salt.
    2. **Switch from PET to Tumblers**: Drink filtered water from glass or stainless steel bottles to avoid plastic container leaching.
    3. **Rinse Dried Seaweed**: Washing dried seaweed (Wakame, Kelp) 2–3 times under running tap water removes 70–84% of microplastics.
    4. **Avoid Heated Plastic Utensils**: Replace scratched plastic cutting boards and plastic ladles with wood or stainless steel.
    """)

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
