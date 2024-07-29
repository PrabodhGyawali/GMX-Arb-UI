import { useEffect } from 'react'
import fetchSchema from '../../build/position-types.ts'


async function get_positions() {
    await fetchSchema()
}
function PositionMonitor() {
    // useEffect( () => {
    //     // code to run after render
    //     get_positions()
    //     // optional cleanup function
    //     return (
    //         <div>

    //         </div>
    //     ) 
    // }, []);
    return (
        <div>
            <button onClick={get_positions}>Position Monitor</button>
        </div>
    )
}

export default PositionMonitor