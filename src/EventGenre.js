import React, { Component, useEffect, useState } from "react";
import {
    PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts';

const EventGenre = ({ events }) => {
    // const data = [
    //     { name: 'Group A', value: 400 },
    //     { name: 'Group B', value: 300 },
    //     { name: 'Group C', value: 300 },
    //     { name: 'Group D', value: 200 },
    // ];

    const [ data, setData] = useState([]);

    useEffect(() => { 
        const getData = () => {
    
          const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];
    
            const data = genres.map(genre => {
                const value = events.filter(event => event.summary.split(' ').includes(genre)).length
                return { name: genre, value };
            })
            return data;
          };
        setData(() => getData());}, [events]);
    
    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <ResponsiveContainer height={400}>
            <PieChart width={400} height={400}>
                <Pie
                  data={data}
                  cx={200}
                  cy={200}
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
            </PieChart>
        </ResponsiveContainer>
    )
}

export default EventGenre;