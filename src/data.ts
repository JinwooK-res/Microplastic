/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FoodConfig, FoodKey, UserIntakes } from "./types";

export const MP_CONCENTRATION: Record<FoodKey, FoodConfig> = {
  salt: {
    name_kr: "소금",
    value: 0.22,
    unit: "p/g",
    description: "천일염, 천연 암염 및 정제 소금에 함유된 미세플라스틱",
    defaultVal: 10,
    min: 0,
    max: 100,
    step: 1
  },
  fish_sauce: {
    name_kr: "액젓",
    value: 0.60,
    unit: "p/g",
    description: "멸치액젓, 까나리액젓 등 발효 어장류",
    defaultVal: 5,
    min: 0,
    max: 100,
    step: 1
  },
  salted_seafood: {
    name_kr: "젓갈",
    value: 5.30,
    unit: "p/g",
    description: "오징어젓, 낙지젓, 명란젓 등 해산물 염장 가공품",
    defaultVal: 15,
    min: 0,
    max: 200,
    step: 5
  },
  seaweed: {
    name_kr: "해조류",
    value: 4.00,
    unit: "p/g",
    description: "미역, 다시마, 김 등 바다에서 채취한 다당류 식물군",
    defaultVal: 20,
    min: 0,
    max: 300,
    step: 5
  },
  honey: {
    name_kr: "꿀",
    value: 0.18,
    unit: "p/g",
    description: "벌이 수집하는 과정 및 대기 중에서 혼입되는 미세 입자",
    defaultVal: 10,
    min: 0,
    max: 100,
    step: 1
  },
  soy_sauce: {
    name_kr: "간장",
    value: 30.0,
    unit: "p/L",
    description: "대량 유통 및 조미 과정에서 발견되는 액상 장류",
    defaultVal: 0.05,
    min: 0,
    max: 2.0,
    step: 0.01
  },
  beer: {
    name_kr: "맥주",
    value: 9.0,
    unit: "p/L",
    description: "양조 용수 및 병입 과정에서 미량 검출되는 입자",
    defaultVal: 1.5,
    min: 0,
    max: 10.0,
    step: 0.1
  },
  beverage: {
    name_kr: "음료",
    value: 1.75,
    unit: "p/L",
    description: "생수 및 페트병입 탄산음료, 주스 가공품류",
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
    title: "정제/가공 소금 활용하기",
    desc: "천일염 대신 상대적으로 가공이나 여과 수준이 높은 암염이나 정제 소금을 사용하면 미세플라스틱 섭취를 크게 줄일 수 있습니다."
  },
  {
    title: "페트병 대신 텀블러 사용하기",
    desc: "일회용 생수병이나 플라스틱 용기에 든 음료 대신 유리병에 든 제품이나 정수기 필터를 거친 물을 스테인리스/유리 텀블러에 담아 마시는 것이 효과적입니다."
  },
  {
    title: "해조류 조리 전 철저한 세척",
    desc: "미역, 다시마 등의 해조류는 물에 씻는 과정에서 표면에 묻어 있던 상당수의 미세플라스틱 입자가 씻겨 나가므로, 흐르는 물에 여러 번 씻는 것이 아주 중요합니다."
  },
  {
    title: "플라스틱 주방용품 멀리하기",
    desc: "뜨거운 국이나 찌개를 조리할 때 플라스틱 국자나 도구를 사용하지 않고, 흠집이 많이 난 플라스틱 도마 대신 친환경 나무/유리 도마를 사용하는 것이 간접 노출을 줄여줍니다."
  }
];

export const PYTHON_STREAMLIT_CODE = `import streamlit as st
import pandas as pd

# 1. 데이터 세팅 (상수 데이터)
MP_CONCENTRATION = {
    "salt": {"name_kr": "소금", "value": 0.22, "unit": "p/g", "desc": "천일염, 천연 암염 및 정제 소금에 함유된 미세플라스틱"},
    "fish_sauce": {"name_kr": "액젓", "value": 0.60, "unit": "p/g", "desc": "멸치액젓, 까나리액젓 등 발효 어장류"},
    "salted_seafood": {"name_kr": "젓갈", "value": 5.30, "unit": "p/g", "desc": "오징어젓, 낙지젓, 명란젓 등 해산물 염장 가공품"},
    "seaweed": {"name_kr": "해조류", "value": 4.00, "unit": "p/g", "desc": "미역, 다시마, 김 등 바다에서 채취한 다당류 식물군"}, 
    "honey": {"name_kr": "꿀", "value": 0.18, "unit": "p/g", "desc": "벌이 수집하는 과정 및 대기 중에서 혼입되는 미세 입자"},
    "soy_sauce": {"name_kr": "간장", "value": 30.0, "unit": "p/L", "desc": "대량 유통 및 조미 과정에서 발견되는 액상 장류"},
    "beer": {"name_kr": "맥주", "value": 9.00, "unit": "p/L", "desc": "양조 용수 및 병입 과정에서 미량 검출되는 입자"},
    "beverage": {"name_kr": "음료", "value": 1.75, "unit": "p/L", "desc": "생수 및 페트병입 탄산음료, 주스 가공품류"}
}

# 페이지 설정
st.set_page_config(
    page_title="주간 미세플라스틱 섭취량 계산기",
    page_icon="⚠️",
    layout="wide"
)

# Custom CSS for Bento feel
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

# 2. UI 구성
st.markdown("### 🧬 Environmental Health Tracker")
st.title("⚠️ 나의 주간 미세플라스틱 섭취량 계산기")
st.markdown("매일 먹는 일상 식품들을 통해 우리는 자신도 모르게 미세플라스틱을 섭취하고 있습니다. 각 식품군별 주간 섭취량을 조절하여 총 누적 노출량을 실시간으로 자가 진단하십시오.")

st.markdown("---")

# 입력을 위한 두 개의 열 구성
col_left, col_right = st.columns([6, 5])

user_inputs = {}

with col_left:
    st.subheader("📊 식품군별 주간 섭취량 입력")
    
    # 2열 Bento 스타일 배치
    sub_col1, sub_col2 = st.columns(2)
    
    with sub_col1:
        st.markdown("#### 🌾 고체 식품군 (g 단위)")
        user_inputs["salt"] = st.slider(
            "🧂 소금 (g/주)",
            min_value=0.0, max_value=100.0, value=10.0, step=1.0,
            help=MP_CONCENTRATION["salt"]["desc"]
        )
        user_inputs["fish_sauce"] = st.slider(
            "🐟 액젓 (g/주)",
            min_value=0.0, max_value=100.0, value=5.0, step=1.0,
            help=MP_CONCENTRATION["fish_sauce"]["desc"]
        )
        user_inputs["salted_seafood"] = st.slider(
            "🦐 젓갈 (g/주)",
            min_value=0.0, max_value=200.0, value=15.0, step=5.0,
            help=MP_CONCENTRATION["salted_seafood"]["desc"]
        )
        user_inputs["seaweed"] = st.slider(
            "🌿 해조류 (g/주)",
            min_value=0.0, max_value=300.0, value=20.0, step=5.0,
            help=MP_CONCENTRATION["seaweed"]["desc"]
        )
        user_inputs["honey"] = st.slider(
            "🍯 꿀 (g/주)",
            min_value=0.0, max_value=100.0, value=10.0, step=1.0,
            help=MP_CONCENTRATION["honey"]["desc"]
        )

    with sub_col2:
        st.markdown("#### 🍹 액체 식품군 (L 단위)")
        user_inputs["soy_sauce"] = st.slider(
            "🧴 간장 (L/주)",
            min_value=0.0, max_value=2.0, value=0.05, step=0.01,
            help=MP_CONCENTRATION["soy_sauce"]["desc"]
        )
        user_inputs["beer"] = st.slider(
            "🍺 맥주 (L/주)",
            min_value=0.0, max_value=10.0, value=1.5, step=0.1,
            help=MP_CONCENTRATION["beer"]["desc"]
        )
        user_inputs["beverage"] = st.slider(
            "🥤 음료 (L/주)",
            min_value=0.0, max_value=15.0, value=2.0, step=0.1,
            help=MP_CONCENTRATION["beverage"]["desc"]
        )

# 3. 계산 로직
exposure_data = []
total_particles = 0.0

for key, config in MP_CONCENTRATION.items():
    intake = user_inputs[key]
    concentration = config["value"]
    exposure = concentration * intake
    total_particles += exposure
    
    exposure_data.append({
        "key": key,
        "식품군": config["name_kr"],
        "섭취량": intake,
        "단위": "g" if config["unit"] == "p/g" else "L",
        "농도": concentration,
        "농도단위": config["unit"],
        "노출량 (개)": exposure
    })

df = pd.DataFrame(exposure_data)
if total_particles > 0:
    df["점유 비중 (%)"] = (df["노출량 (개)"] / total_particles) * 100
else:
    df["점유 비중 (%)"] = 0.0

# 1 particle = ~0.002 mg 추정 중량
plastic_weight_mg = total_particles * 0.002
credit_card_fraction = plastic_weight_mg / 5000.0  # 신용카드 1장 = 5g (5000mg)

# 내림차순 정렬
df_sorted = df.sort_values(by="노출량 (개)", ascending=False)
worst_row = df_sorted.iloc[0] if total_particles > 0 else None

with col_right:
    st.subheader("🔍 나의 주간 노출량 진단 결과")
    
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
            당신이 이번 주에 식품군을 통해 직접적으로 섭취한 것으로 추정되는 미세플라스틱 알갱이의 총합입니다.
        </p>
        <hr style="border-color: #1e293b; margin: 20px 0 15px 0;">
        <div style="display: flex; justify-content: space-around; text-align: center;">
            <div>
                <span style="color: #64748b; font-size: 10px; font-weight: bold; text-transform: uppercase;">추정 중량</span>
                <span style="color: #e2e8f0; font-size: 14px; font-weight: 900; display: block; margin-top: 3px;">약 {plastic_weight_mg:.2f} mg</span>
            </div>
            <div style="border-left: 1px solid #1e293b;"></div>
            <div>
                <span style="color: #64748b; font-size: 10px; font-weight: bold; text-transform: uppercase;">연간 신용카드</span>
                <span style="color: #fbbf24; font-size: 14px; font-weight: 900; display: block; margin-top: 3px;">연간 {(credit_card_fraction * 52):.1f}장 분량</span>
            </div>
        </div>
    </div>
    """, unsafe_allow_html=True)
    
    if total_particles > 0 and worst_row is not None:
        st.warning(f"⚠️ **주의 요인 분석:** 현재 입력값 기준 가장 노출 비중이 큰 요인은 **[{worst_row['식품군']}]** 이며, 전체 노출량의 무려 **{worst_row['점유 비중 (%)']:.1f}%** 를 차지하고 있습니다.")
    else:
        st.info("💡 **가이드:** 주간 식품 섭취 수치를 설정하시면 실시간 자가 노출량이 정밀하게 계산됩니다.")

st.markdown("---")

col_bottom_left, col_bottom_right = st.columns([6, 5])

with col_bottom_left:
    st.subheader("📊 품목별 노출 점유율 (Top Exposure)")
    
    df_chart = df_sorted[df_sorted["노출량 (개)"] > 0]
    if not df_chart.empty:
        # Mini bar chart representation
        for idx, row in df_chart.head(4).iterrows():
            st.markdown(f"**{row['식품군']}** - {row['노출량 (개)']:.1f} p ({row['점유 비중 (%)']:.1f}%)")
            st.progress(float(row['점유 비중 (%)'] / 100.0))
    else:
        st.info("섭취량이 0인 경우 차트가 비어있게 됩니다.")
        
    with st.expander("📝 상세 섭취 및 노출 데이터 테이블 보기"):
        st.dataframe(
            df_sorted[["식품군", "농도", "농도단위", "섭취량", "단위", "노출량 (개)", "점유 비중 (%)"]],
            use_container_width=True,
            hide_index=True
        )

with col_bottom_right:
    st.subheader("💡 일상 속 미세플라스틱 노출 절감 가이드")
    st.success("""
    1. **정제/가공 소금 선택**: 천일염 대신 정제 공정을 잘 거친 정제염이나 암염을 위주로 섭취하세요.
    2. **텀블러 생활화**: 일회용 페트병입 음료 대신 다회용 유리병이나 스테인리스 텀블러를 적극 사용해 보세요.
    3. **해조류 철저 세척**: 김, 다시마, 미역 등은 조리 전에 흐르는 맑은 물에 충분히 여러 번 흔들어 씻어내십시오.
    4. **플라스틱 가열 자제**: 뜨거운 조리 도중에 플라스틱 국자나 도마 등을 멀리하고 친환경 나무/스테인리스를 쓰면 노출이 격감합니다.
    """)

# 학술 논문 레퍼런스 표기
st.markdown("""
<div class="ref-card">
    <p style="margin: 0; font-size: 12px; font-weight: bold; color: #1e1b4b;">📖 학술 연구 레퍼런스 (Scientific Academic Reference)</p>
    <p style="margin: 5px 0 2px 0; font-size: 14px; font-weight: bold; color: #1e293b; font-family: sans-serif;">
        "Analysis of microplastics in various foods and assessment of aggregate human exposure via food consumption in korea"
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
st.caption("주간 미세플라스틱 노출량 계산기 | Bento Grid Theme Streamlit MVP App | 한국 성인 평균 섭취 모델 기반")
`;
