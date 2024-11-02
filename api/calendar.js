import { ImageResponse } from '@vercel/og';
import { Solar, Lunar } from 'lunar-javascript';

export const config = {
  runtime: 'edge',
};

function getCalendarData() {
    const solar = Solar.fromDate(new Date());
    const lunar = Lunar.fromDate(new Date());
    const shuJiu = lunar.getShuJiu();
    const shuJiuString = shuJiu ? shuJiu.toFullString() : 'N/A';
    const Fu = lunar.getFu();
    const FuString = Fu ? Fu.toFullString() : 'N/A';

    return {
        SolarYear: solar.getYear().toString() + '年',
        SolarMonth: solar.getMonth().toString() + '月',
        SolarDay: solar.getDay().toString() + '日',
        WeekDay: '星期' + solar.getWeekInChinese(),
        lunarMonth: lunar.getMonthInChinese() + '月',
        lunarDay: lunar.getDayInChinese(),
        ganzhiYear: lunar.getYearInGanZhiByLiChun() + '年',
        ganzhiMonth: lunar.getMonthInGanZhiExact() + '月',
        ganzhiDay: lunar.getDayInGanZhiExact() + '日',
        yuexiang: lunar.getYueXiang() + '月',
        wuhou: lunar.getWuHou(),
        hou: lunar.getHou(),
        shujiu: shuJiuString,
        fu: FuString,
    };
}

export default async function handler(req) {
  const data = getCalendarData();
  
  const fontUrl = 'https://github.com/adobe-fonts/source-han-sans/raw/release/OTF/SimplifiedChinese/SourceHanSansSC-Regular.otf';
  const fontData = await fetch(new URL(fontUrl)).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 16,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          padding: 20,
          fontFamily: 'SourceHanSansSC',
        }}
      >
        {Object.entries(data).map(([key, value], index) => (
          <div key={key} style={{ marginBottom: 10 }}>
            {key}: {value}
          </div>
        ))}
      </div>
    ),
    {
      width: 400,
      height: 300,
      fonts: [
        {
          name: 'SourceHanSansSC',
          data: fontData,
          style: 'normal',
        },
      ],
    }
  );
}