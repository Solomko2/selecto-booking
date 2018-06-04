import React from 'react'
import {components} from "../../components";

const {
    Huinya
} = components;

// Components

export default class extends React.Component {
    render() {
        const ar: number = 23;

        return (
            <div>
                {ar}
                <Huinya/>
            </div>
        )
    }
}