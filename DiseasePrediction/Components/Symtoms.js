import { View,} from 'react-native'
import React, { useState} from 'react'
import { Picker } from '@react-native-picker/picker'

const Symtoms = ({getSymtom}) => {
  const [Value, setValue] = useState('');
  return (
    <View>
      <Picker
        selectedValue={Value}
        onValueChange={(itemValue) =>{
            setValue(itemValue);
            getSymtom(itemValue);
        }}>
        <Picker.Item label='Select Symptom' value='' />
        <Picker.Item label='Abdominal pain   پیٹ کا درد' value='abdominal_pain'/>
        <Picker.Item label='Abnormal menstruation    غیر معمولی حیض' value='abnormal_menstruation'/>
        <Picker.Item label='Acidity    تیزابیت' value='acidity'/>
        <Picker.Item label='Anxiety    بے چینی' value='anxiety'/>
        <Picker.Item label='Back Pain    کمر درد' value='back_pain'/>
        <Picker.Item label='Bladder discomfort    مثانے کی تکلیف' value='bladder_discomfort'/>
        <Picker.Item label='Bloody stool    خونی پاخانہ' value='bloody_stool'/>
        <Picker.Item label='Blurred Vision    دھندلی نظر' value='blurred_and_distorted_vision'/>
        <Picker.Item label='Breathlessness   سانس پھولنا' value='breathlessness'/>
        <Picker.Item label='Brittle nails    ٹوٹے ہوئے ناخن' value='brittle_nails'/>
        <Picker.Item label='Chest pain    سینے میں درد' value='chest_pain'/>
        <Picker.Item label='Chills    سردی' value='chills'/>
        <Picker.Item label='Cold hand and feet    ٹھنڈے ہاتھ اور پاؤں' value='cold_hands_and_feets'/>
        <Picker.Item label='Coma    بے ہوشی' value='coma'/>
        <Picker.Item label='Congestion    انجماد خون' value='congestion'/>
        <Picker.Item label='Constipation    قبض' value='constipation'/>
        <Picker.Item label='Continuous feel of urine    پیشاب کا مسلسل احساس' value='continuous_feel_of_urine'/>
        <Picker.Item label='Continuous sneezing    مسلسل چھینکیں' value='continuous_sneezing'/>
        <Picker.Item label='Cough    کھانسی' value='cough'/>
        <Picker.Item label='Dehydration    پانی کی کمی' value='dehydration'/>
        <Picker.Item label='Depression    ذہنی دباؤ' value='depression'/>
        <Picker.Item label='Diarrhea    پیچش' value='diarrhoea'/>
        <Picker.Item label='Dizziness    چکر آنا' value='dizziness'/>
        <Picker.Item label='Drying lips    خشک ہونٹ' value='drying_and_tingling_lips'/>
        <Picker.Item label='Excessive hunger    ضرورت سے زیادہ بھوک لگنا' value='excessive_hunger'/>
        <Picker.Item label='Fast heart rate    تیز دل کی دھڑکن' value='fast_heart_rate'/>
        <Picker.Item label='Fatigue    تھکاوٹ' value='fatigue'/>
        <Picker.Item label='Headache    سر میں درد' value='headache'/>
        <Picker.Item label='High fever    تیز بخار' value='high_fever'/>
        <Picker.Item label='Indigestion    بدہضمی' value='indigestion'/>
        <Picker.Item label='Irregular sugar level    شوگر کی بے قاعدہ سطح' value='irregular_sugar_level'/>
        <Picker.Item label='Irritability    چڑچڑاپن' value='irritability'/>
        <Picker.Item label='Irritation of anus    مقعد کی جلن' value='irritation_in_anus'/>
        <Picker.Item label='Itching    خارش' value='itching'/>
        <Picker.Item label='Joint pain    جوڑوں کا درد' value='join_pain'/>
        <Picker.Item label='Knee pain    گھٹنے کا درد' value='knee_pain'/>
        <Picker.Item label='Lathargy    سستی' value='lathargy'/>
        <Picker.Item label='Loss of apetite    بھوک میں کمی' value='loss_of_appetite'/>
        <Picker.Item label='Loss of smell    بو کی کمی' value='loss_of_smell'/>
        <Picker.Item label='Neck pain    گردن میں درد' value='neck_pain'/>
        <Picker.Item label='Pain  behind eye    آنکھ کے پیچھے درد' value='pain_behind_the_eyes'/>
        <Picker.Item label='Passage of gas    ہوا کا گزرنا' value='passage_of_gases'/>
        <Picker.Item label='Phlegm    بلغم' value='phlegm'/>
        <Picker.Item label='Red eye    سرخ آنکھ' value='redness_of_eyes'/>
        <Picker.Item label='Red sore around nose    ناک کے ارد گرد سرخ زخم' value='red_sore_around_nose'/>
        <Picker.Item label='Red spot over body    جسم پر سرخ دھبہ' value='red_spots_over_body'/>
        <Picker.Item label='Runny nose    بہتی ہوئی ناک' value='runny_nose'/>
        <Picker.Item label='Shiverring    کانپنا' value='shivering'/>
        <Picker.Item label='Skin eruption    جلد کا پھٹنا' value='nodal_skin_eruptions'/>
        <Picker.Item label='Skin peeling    جلد کا چھیلنا' value='skin_peeling'/>
        <Picker.Item label='Sore throat    گلے کی سوزش' value='patches_in_throat'/>
        <Picker.Item label='Sunken eye    دھنسی ہوئی آنکھ' value='sunken_eyes'/>
        <Picker.Item label='Sweating    پسینہ ' value='sweating'/>
        <Picker.Item label='Stomach pain    پیٹ میں درد' value='stomach_pain'/>
        <Picker.Item label='Swollen legs    سوجی ہوئی ٹانگیں' value='swollen_legs'/>
        <Picker.Item label='Throat irritation    گلے کی جلن' value='throat_irritation'/>
        <Picker.Item label='Ulcer on tongue    زبان پر السر' value='ulcers_on_tongue'/>
        <Picker.Item label='Vomiting    الٹی' value='vomiting'/>
        <Picker.Item label='Weakness of one body side ' value='weakness_of_one_body_side'/>
        <Picker.Item label='Weakness in limbs    اعضاء میں کمزوری' value='weakness_in_limbs'/>
        <Picker.Item label='Yellow eye    پیلی آنکھ' value='yellowing_of_eyes'/>
        <Picker.Item label='Yellow urine    پیلا پیشاب' value='yellow_urine'/>
        <Picker.Item label='Yellowish skin    زرد جلد' value='yellowish_skin'/>
      </Picker>
    </View>
  )
}

export default Symtoms