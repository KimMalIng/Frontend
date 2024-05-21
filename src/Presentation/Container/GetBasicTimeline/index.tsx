import { SERVER_URL } from "@/Const";
import { useRouter } from "next/router";
import { useState } from "react";
import { Header } from '@/Presentation/Component';
import cn from 'classnames';
import { LocalStorageDataSource } from "@/Data/DataSource";

import styleOld from '@/Presentation/Style/Everytime.module.css';
import style from "@/Presentation/Style/NewTask.module.css";

import '@fontsource/inter';

interface Time {
    startHour: string;
    startMinute: string;
    endHour: string;
    endMinute: string;
}

interface Schedule {
    sleep: Time;
    breakfast: Time;
    lunch: Time;
    dinner: Time;
}

const BasicTimeline = () => {
    const router = useRouter();

    const [schedule, setSchedule] = useState<Schedule>({
        sleep: { startHour: "00", startMinute: "00", endHour: "08", endMinute: "00" },
        breakfast: { startHour: '08', startMinute: '00', endHour: '09', endMinute: '00' },
        lunch: { startHour: '12', startMinute: '00', endHour: '13', endMinute: '00' },
        dinner: { startHour: '18', startMinute: '00', endHour: '19', endMinute: '00' },
    });

    const [minuteControl, setMinuteControl] = useState('00');
    const handleChange = (event: any, period: keyof Schedule, type: any) => {
        const { name, value } = event.target;
        if (isNaN(Number(value))) return;
        if (type == "startHour" || "endHour") {
            if (Number(value) > 23 || Number(value) < 0) {
                alert("시간 범위 : 00:00 ~ 23:59");

                return;
            }
        }
        if (type == "startMinute" || "endMinute") {
            if (Number(value) > 59 || Number(value) < 0) {
                console.log(value);
                alert("시간 범위 : 00:00 ~ 23:59");
                return;
            }
            setMinuteControl(`${Math.ceil(Number(value) / 10) * 10}`)
        }
        setSchedule((prev: any) => ({
            ...prev,
            [period]: {
                ...prev[period],
                [type]: minuteControl,
            },
        }));
    };
    const handleSubmit = async () => {
        const accessToken = await LocalStorageDataSource.getLocalStorage("accessToken");
        console.log(accessToken);
        const body = [
            {
                "name": "수면",
                "startTime": `${schedule.sleep.startHour}:${schedule.sleep.startMinute}`,
                "endTime": `${schedule.sleep.endHour}:${schedule.sleep.endMinute}`
            },
            {
                "name": "아침",
                "startTime": `${schedule.breakfast.startHour}:${schedule.breakfast.startMinute}`,
                "endTime": `${schedule.breakfast.endHour}:${schedule.breakfast.endMinute}`
            },
            {
                "name": "점심",
                "startTime": `${schedule.lunch.startHour}:${schedule.lunch.startMinute}`,
                "endTime": `${schedule.lunch.endHour}:${schedule.lunch.endMinute}`
            },
            {
                "name": "저녁",
                "startTime": `${schedule.dinner.startHour}:${schedule.dinner.startMinute}`,
                "endTime": `${schedule.dinner.endHour}:${schedule.dinner.endMinute}`
            }
        ];
        console.log(JSON.stringify(body));

        try {
            const res = await fetch(`${SERVER_URL}/job/save/default`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify(body),
            });
            if (res.ok) {
                const data = res.json; 
                console.log(data);
                router.push("/main");
            } else {
                console.error('HTTP error:', res.status);
                return Promise.reject(res.status);
            }
        } catch (error) {
            console.log(error);
            return Promise.reject(500);
        }
    };

    const renderTimeInputs = (period: keyof Schedule) => (
        <div className={style.NumberRow}>
            <div className={style.NumberInputBox}>
                <input
                    type="number"
                    value={schedule[period].startHour}
                    onChange={(e) => handleChange(e, period, 'startHour')}
                    className={style.NumberInput}
                    min="0"
                    max="23"
                    name="startHour"
                />
                <h2 className={style.NumberInputSlice}> : </h2>
                <input
                    type="number"
                    value={schedule[period].startMinute}
                    onChange={(e) => handleChange(e, period, 'startMinute')}
                    className={style.NumberInput}
                    min="0"
                    max="59"
                    name="startMinute"
                />
                <p>부터 </p>
            </div>
            <div className={style.NumberInputBox}>
                <input
                    type="number"
                    value={schedule[period].endHour}
                    onChange={(e) => handleChange(e, period, 'endHour')}
                    className={style.NumberInput}
                    min="0"
                    max="23"
                    name="endHour"
                />
                <h2 className={style.NumberInputSlice}> : </h2>
                <input
                    type="number"
                    value={schedule[period].endMinute}
                    onChange={(e) => handleChange(e, period, 'endMinute')}
                    className={style.NumberInput}
                    min="0"
                    max="59"
                    name="endMinute"
                />
                <p>까지</p>
            </div>
        </div>
    );

    return (
        <>
            <Header />
            <div className={styleOld.ET}>
                <div className={styleOld.ContentBox}>
                    <div className={styleOld.TextBox}>
                        <h2 className={styleOld.ContentTitle}>고정시간 입력하기</h2>
                        <p>시간표가 자동으로 고정된 일정에 등록됩니다 </p>
                    </div>
                    <form onSubmit={handleSubmit}>

                        <h2 className={style.TimeBoxTitle}>주로 수면 시간은 언제쯤인가요?</h2>
                        {renderTimeInputs('sleep')}

                        <h2 className={style.TimeBoxTitle}>아침은 언제쯤 드시나요?</h2>
                        {renderTimeInputs('breakfast')}

                        <h2 className={style.TimeBoxTitle}>점심은 언제쯤 드시나요?</h2>
                        {renderTimeInputs('lunch')}

                        <h2 className={style.TimeBoxTitle}>저녁은 언제쯤 드시나요?</h2>
                        {renderTimeInputs('dinner')}
                        <div className={style.BtnBox}>
                            <div
                                className={cn(styleOld.SubmitBtn, styleOld.Save)}
                                onClick={handleSubmit}
                            >
                                등록하기
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default BasicTimeline;