import React from 'react'
import {components} from "../../components";

const {
    Huinya
} = components;

// Components

export default class extends React.Component {
    render() {
        const ar: number = 23;
        console.log(process.env.TEST);
        return (
            <div>
                {process.env.TEST}
                {ar}
                <Huinya/>
            </div>
        )
    }
}