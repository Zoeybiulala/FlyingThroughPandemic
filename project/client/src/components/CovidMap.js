import React, {useState, useEffect} from "react";
import {
    Annotation,
    ComposableMap,
    Geographies,
    Geography, Graticule, Marker,
    ZoomableGroup
} from "react-simple-maps";
import { useTheme } from '@material-ui/core/styles';
import geoUrl from '../data/statesMap.json';
import allStates from '../data/allStates.json';
import stateNames from '../data/stateNames.json';
import { geoCentroid } from 'd3-geo';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';


// import {UseData} from "../data/useData";
// const confirmedUrl = '../data/covid_cases_confirmed.csv';
// const deadUrl = '../data/covid_cases_dead.csv';

const offsets = {
    VT: [50, -8],
    NH: [34, 2],
    MA: [30, -1],
    RI: [28, 2],
    CT: [35, 10],
    NJ: [34, 1],
    DE: [33, 0],
    MD: [47, 10],
    DC: [49, 21],
};

function CovidMap () {
    const [confirmedCases, setConfirmedCases] = useState(''); //default total
    const [deaths, setDeaths] = useState('');
    const [region, setRegion]  = useState('');
    const mortalityRate = deaths / confirmedCases;
    const mortalityRateString = mortalityRate.toLocaleString(undefined, {style: 'percent'});

    useEffect(() => {
        fetch(`http://localhost:8080/api/confirm`)
            .then(res => res.json())
            .then(resJson => {
                setConfirmedCases(resJson['total number']);
            })
        fetch(`http://localhost:8080/api/death`)
            .then(res => res.json())
            .then(resJson => {
                setDeaths(resJson['total number']);
            })
    }, []);


    const confirmChange = (id) => {
        const suoxie = allStates.find((s) => s.val === id);
        if(!suoxie) return null;
        setRegion(stateNames[suoxie.id.toString()]);
        console.log(region);
        fetch(`http://localhost:8080/api/state-confirm?region=${region}`)
            .then(res => res.json())
            .then(resJson => {
                setConfirmedCases(resJson['total number']);
            })


    }

    const deathChange = (id) => {
        const suoxie = allStates.find((s) => s.val === id);
        if(!suoxie) return null;
        setRegion(stateNames[suoxie.id.toString()]);
        console.log(region);
        fetch(`http://localhost:8080/api/state-death?region=${region}`)
            .then(res => res.json())
            .then(resJson => {
                setDeaths(resJson['total number']);
            })
    }

    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>State</TableCell>
                            <TableCell>Confirmed Cases</TableCell>
                            <TableCell>Deaths</TableCell>
                            <TableCell>Mortality Rate</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>{region}</TableCell>
                            <TableCell>{confirmedCases}</TableCell>
                            <TableCell>{deaths}</TableCell>
                            <TableCell>{mortalityRateString}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>


            <div className="Map" style={{width: "600px", border:"double"}}>
                <ComposableMap projection='geoAlbersUsa' data-tip=''>
                    {/*<Graticule stroke='#D4D5D6' strokeWidth={0.5} />*/}
                    {/*<Fade in={dataStore.ready} timeout={1000}>*/}
                    <Geographies geography={geoUrl}>
                        {({ geographies }) => (
                            <>
                                {geographies.map((geo) => {
                                    // const stateKey = getMatchingStateKey(dataStore, geo);
                                    // if (!stateKey) {
                                    //     return null;
                                    // }
                                    // const d = dataStore.getRegionData(stateKey);
                                    return (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            onMouseEnter={() => {
                                            }}
                                            onMouseLeave={() => {
                                            }}
                                            onClick={() => {
                                                //should display the corresponding state stats
                                                confirmChange(geo.id);
                                                deathChange(geo.id);
                                                alert(geo.id);
                                            }}
                                            style={{
                                                default: {
                                                    transition: 'fill 0.6s linear',
                                                    fill: '#FA4590',
                                                    outline: 'none',
                                                },
                                                hover: {
                                                    fill: '#F2EAEA',
                                                    outline: 'none',
                                                    cursor: 'pointer',
                                                },
                                                pressed: {
                                                    fill: '#F2EAEA',
                                                    outline: 'none',
                                                },
                                            }}
                                        />
                                    );
                                })}
                                {geographies.map((geo) => {
                                    const centroid = geoCentroid(geo);
                                    const cur = allStates.find((s) => s.val === geo.id);
                                    return (
                                        <g key={geo.rsmKey + '-name'}>
                                            {cur &&
                                                centroid[0] > -160 &&
                                                centroid[0] < -67 &&
                                                (Object.keys(offsets).indexOf(cur.id) === -1 ? (
                                                    <Marker coordinates={centroid}>
                                                        <text y='2' fontSize={14} textAnchor='middle'>
                                                            {cur.id}
                                                        </text>
                                                    </Marker>
                                                ) : (
                                                    <Annotation
                                                        subject={centroid}
                                                        dx={offsets[cur.id][0]}
                                                        dy={offsets[cur.id][1]}
                                                    >
                                                        <text x={4} fontSize={14} alignmentBaseline='middle'>
                                                            {cur.id}
                                                        </text>
                                                    </Annotation>
                                                ))}
                                        </g>
                                    );
                                })}
                            </>
                        )}
                    </Geographies>
                </ComposableMap>
            </div>
        </div>



    )
}

export default CovidMap;
