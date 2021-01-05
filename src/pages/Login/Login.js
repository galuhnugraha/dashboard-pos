import React, { useState } from "react";
// import {observer} from 'mobx-react-lite';
// import {useStore} from "../../utils/useStores";
import { Link, useHistory } from "react-router-dom";
import './style.css';
import Logo from '../../assets/images/logo.png';

export const Login = () => {
    let history = useHistory();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    return <>
        <div>
            <div class="logo">
                <div class="icon">
                    {/* <img src="https://3.bp.blogspot.com/-c3oFqA2pjj4/W6kIZ6sYKEI/AAAAAAAAEY8/KrijheXG9wwPhXux2iZtiW-GKfrfAfh5wCLcBGAs/s400/pt.%2Bhakaaston%2Bsipp%2Bjos%2Btop.jpg" /> */}
                    
                </div>
            </div>
            <div class="login-page">
                <div class="form">
                <img src={Logo} style={{height: 50}}/>
                    <div>
                        
                        <div>
                            <h2 style={{ marginBottom: 45, fontSize: 16, borderBottomWidth: 1, }}>Login To Admin</h2>
                        </div>
                    </div>
                    <form class="login-form">
                        <card>
                            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <button onClick={() => history.push("/app/home")}>Login</button>
                        </card>
                    </form>
                </div>
            </div>
        </div>

    </>;
};
