import { useState, useEffect } from 'react';
import randomstring from 'randomstring';
import { CalenderProps } from '@/Presentation/Type';
import style from '@/Presentation/Style/Calender.module.css';

const Calender = ({data}: CalenderProps) => {
  const [list, setList] = useState<number[][]>(
    [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] 
    ]
  );
  const [isRender, setIsRender] = useState(false);
  const createCalender = async () => {
    await Promise.all(
      data.map(async (d) => {
        const date = new Date(`${d.day.replaceAll(".", "-")}`);
        const day = date.getDay();
        await Promise.all(
          d.subject.map((s) => {
            let start = Number(s.startTime.split(":")[0]);
            if(isNaN(start)) return;
            start = start - 8;
            const startPercentage =  Number(s.startTime.split(":")[1]);
            if(isNaN(startPercentage)) return;
            let end = Number(s.endTime.split(":")[0]);
            if(isNaN(end)) return;
            end = end - 8;
            const endPercentage = Number(s.endTime.split(":")[1]);
            console.log(endPercentage)
            if(isNaN(endPercentage)) return;
            let changeList = list;
            changeList[day][start] = s.label + 1 + (startPercentage / 60);
            for(let i = start + 1; i< end - 1; i++){
              changeList[day][i] = s.label + 1;
            }
            changeList[day][end] = s.label + 1 + (endPercentage / 60);
            setList([...changeList]);
          })
        );
      })
    );
    setList([...list]);
    setIsRender(true);
  }

  const calenderHasNext = (data: number[], index: number): boolean => {
    if(typeof data[index + 1] === "undefined") return false;
    if(data[index] === 0) return false;
    if(data[index + 1] !== 0) return true;
    if(data[index + 1] === 0 && data[index] > 1) return true; 
    return false;
  }

  const setLabelColor = (label: number): string => {
    const translateLabel = label + 1;
    if(translateLabel === 1){
      return "rgb(255, 148, 167)";
    }
    return "#fff";
  }

  const renderCalender = () => {
    return list.map((d)=>{
      return (
        <div 
          className={style.CalenderContentList} 
          key={randomstring.generate(16)}
        >
          {
            d.map((s, i)=>{
              return(
                <div 
                  key={randomstring.generate(16)}
                  style={{
                    backgroundColor: setLabelColor(Math.floor(s + 1)),
                    borderBottom: `1px solid ${(calenderHasNext(d, i)) ? (
                        "none"
                      ) : (
                        " 1px solid rgba(31, 36, 33, 0.2)"
                      )}`
                  }}
              ></div>
              );
            })
          }
        </div>
      )
    })
  }
  useEffect(() => {
    createCalender()
  }, [])

  useEffect(() => {
    console.log(isRender);
    console.log(list);
  }, [list]);

  return(
    <div className={style.Calender}>
      <div className={style.title}>
        <h2>2023.12.15~2023.12.22</h2>
      </div>
      <div className={style.calenderBox}>
        <div className={style.calenderRow}>
          <div className={style.calenderRowTitle}>8</div>
          <div className={style.calenderRowTitle}>9</div>
          <div className={style.calenderRowTitle}>10</div>
          <div className={style.calenderRowTitle}>11</div>
          <div className={style.calenderRowTitle}>12</div>
          <div className={style.calenderRowTitle}>13</div>
          <div className={style.calenderRowTitle}>14</div>
          <div className={style.calenderRowTitle}>15</div>
          <div className={style.calenderRowTitle}>16</div>
          <div className={style.calenderRowTitle}>17</div>
          <div className={style.calenderRowTitle}>18</div>
          <div className={style.calenderRowTitle}>19</div>
          <div className={style.calenderRowTitle}>20</div>
          <div className={style.calenderRowTitle}>21</div>
          <div className={style.calenderRowTitle}>22</div>
          <div className={style.calenderRowTitle}>23</div>
          <div className={style.calenderRowTitle}>24</div>
        </div>
        <div className={style.calenderContent}>
          <div className={style.calenderTitle}>
            <div className={style.calenderTitleSection}>월</div>
            <div className={style.calenderTitleSection}>화</div>
            <div className={style.calenderTitleSection}>수</div>
            <div className={style.calenderTitleSection}>목</div>
            <div className={style.calenderTitleSection}>금</div>
            <div className={style.calenderTitleSection}>토</div>
            <div className={style.calenderTitleSection}>일</div>
          </div>
          <div className={style.CalenderBox}>
            {(isRender)?(renderCalender()) : (<></>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calender;