import React, {useState} from "react";
import {
    Annotation,
    ComposableMap,
    Geographies,
    Geography, Marker,
    ZoomableGroup
} from "react-simple-maps";
import { Tooltip} from 'react-tooltip'

import geoUrl from '../data/statesMap.json';
import {geoCentroid} from "d3-geo";
import allStates from "../data/allStates.json";


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

function FlyMap () {
    const [content, setContent] = useState("");


    return (
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


    )
}

export default FlyMap;
