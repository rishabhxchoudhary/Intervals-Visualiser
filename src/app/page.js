"use client"
import React, { useState, useEffect } from 'react';

const IntervalsVisualizer = () => {
  const [intervals, setIntervals] = useState([]);
  const [mn,setmin]=useState(1);
  const [mx,setmax]=useState(0);

  useEffect(() => {
    let newmn = intervals[0].start;
    let newmx = intervals[0].start;
    for(let i=0;i<intervals.length;i++){
      intervals[i].start = parseInt(intervals[i].start);
      intervals[i].end = parseInt(intervals[i].end);
      if(intervals[i].start<newmn) newmn=intervals[i].start;
      if(intervals[i].end<newmn) newmn=intervals[i].end;
      if(intervals[i].end>newmx) newmx=intervals[i].end;
      if(intervals[i].start>newmx) newmx=intervals[i].start;
    }
    setmin(newmn);
    setmax(newmx);

  }, [intervals]);

  return (
    <div className='intervals-visualizer'>
      <textarea
        type="text"
        placeholder={`0 10\n20 30\n40 50`}
        className='h-64 w-full border-2 border-gray-300 rounded-md resize-none'
        onChange={(e) => {
          const intervals = e.target.value.split('\n').map((interval) => {
            const [start, end] = interval.split(' ').map((n) => parseInt(n));
            return { start, end };
          });
          setIntervals(intervals);
        }}
      />
      <div className='intervals-container'>
        Min: {mn}, Max : {mx} <br></br>
        {intervals.map((interval, i) => {
          let { start, end } = interval;
          if (start === undefined || isNaN(start) ) return null;
          if (end === undefined || isNaN(end) ) end=start;
          if (end<start) return;
          console.log(start,end,mx,mn)
          const left = `${((start-mn) / (mx-mn)) * 100}%`;
          const width = `${((end - start) / (mx-mn)) * 100}%`;
          const color = `hsl(${i * 30}, 70%, 50%)`;

          return (
            <div
              key={i}
              className='interval h-10 relative flex items-center'
              style={{ left, width, backgroundColor: color }}
            > <span className='interval-label'>{`(${start}, ${end})`}</span></div>
          );
        })}
      </div>
    </div>
  );
};

const Home = () => (
  <div className='p-2'>
    <h1 className='text-2xl font-bold mb-4'>Intervals Visualizer by rishabhxchoudhary</h1>
    <IntervalsVisualizer />
  </div>
);

export default Home;
