import React from 'react';

const Settings = ({ currentQuality, onChangeQuality, resolutions }) => {
    return (
        <div className="settings">
            <select value={currentQuality} onChange={(e) => onChangeQuality(e.target.value)}>
                {resolutions.map((res) => (
                    <option key={res.name} value={res.name}>
                        {res.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Settings;
