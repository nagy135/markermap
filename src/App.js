import React from "react";
import Map from './components/Map';
import Detail from './components/Detail';
import Filter from './components/Filter';

import './App.css';

export default function App() {

    const [filterState, setFilterState] = React.useState(false);
    const [detailState, setDetailState] = React.useState(false);

    const initialSlideValue = [100, 2000];
    const [altitudeRanges, setAltitudeRanges] = React.useState(initialSlideValue);

    const toggleFilter = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setFilterState(open);
    };
    const toggleDetail = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDetailState(open);
    };

    const handleChangeAltitudeRanges = (_event, newValue) => {
        setAltitudeRanges(newValue);
    };

    return (
        <div>
            <Filter
                open={filterState}
                close={toggleFilter}
                handleRangeChange={handleChangeAltitudeRanges}
                altitudeRanges={altitudeRanges}
            >
            </Filter>
            <Detail
                open={detailState}
                close={toggleDetail}
            >
            </Detail>
            <Map
                markerClicked={() => {
                    setDetailState(true);
                }}
                altitudes={altitudeRanges}>
            </Map>
        </div>
    );
}
