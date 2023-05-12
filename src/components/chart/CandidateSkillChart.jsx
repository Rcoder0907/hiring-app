import React, {useEffect, useRef} from 'react'
import Chart from "chart.js/auto"


function CandidateSkillChart({data: allData, title}) {
    const chartRef = useRef()
    useEffect(() => {
        /*const allData = [{name: 'Node.JS', experience: 5, rating: 8.5}, {
            name: 'React.JS',
            experience: 5,
            rating: 9
        }, {name: 'Microservice', experience: 2, rating: 6}, {name: 'AWS', experience: 2, rating: 6}];*/

// #ff7903
// #ffdec1
//         console.log({allData})
        const data = {
            labels: allData.map(row => row.name),
            datasets: [
                {
                    label: 'Experience',
                    data: allData,
                    backgroundColor: "#ff7903",
                    parsing: {
                        xAxisKey: 'experience',
                        yAxisKey: 'name'
                    }
                },
                {
                    label: 'Rating',
                    data: allData,
                    backgroundColor: "#ffdec1",
                    parsing: {
                        xAxisKey: 'rating',
                        yAxisKey: 'name'
                    }
                }
            ]
        };

        const config = {
            type: 'bar',
            data: data,
            options: {
                indexAxis: 'y',
                // Elements options apply to all of the options unless overridden in a dataset
                // In this case, we are setting the border of each horizontal bar to be 2px wide
                elements: {
                    bar: {
                        borderWidth: 2,
                    }
                },
                animations: {
                    tension: {
                        duration: 1000,
                        easing: 'linear',
                        from: 1,
                        to: 0,
                        loop: true
                    },
                },
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: title
                    }
                }
            },
        };
        if (chartRef.current && allData.length) {
            (async function () {
                new Chart(chartRef.current, config)
            })()
        }

    }, [allData])
    return (
        <div style={{padding: 25}}>
            <canvas ref={(me) => chartRef.current = me}/>
        </div>
    )
}

export default CandidateSkillChart
