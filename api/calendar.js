import { ImageResponse } from '@vercel/og';
import getCalendarData from '../utils/lunarUtils';
import { readFileSync } from 'fs';
import { join } from 'path';

export const config = {
  runtime: 'edge',
};

export default async function handler() {
  const data = getCalendarData();
  
  // 读取字体文件
  const fontPath = join(process.cwd(), 'public', 'fonts', 'simhei.ttf');
  const font = readFileSync(fontPath);

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
          fontFamily: 'SimHei',
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
          name: 'SimHei',
          data: font,
          style: 'normal',
        },
      ],
    }
  );
}