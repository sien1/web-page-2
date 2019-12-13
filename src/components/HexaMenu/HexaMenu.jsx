import React, {Component} from 'react';
import myImage from '../../images/avatar.png';
import * as PIXI from "pixi.js";

class HexagonBack extends Component {

    constructor(props){
        super(props);
        this.pixi_cnt = null;
        this.app = new PIXI.Application({
            width:600,
            height:600,
            transparent:false
        });
    }

    updatePixiCnt = (element) => {
        this.pixi_cnt = element;
 
        if(this.pixi_cnt && this.pixi_cnt.children.length <=0 ) {
            this.pixi_cnt.appendChild(this.state.app.view);
            
        }
    }   

    setup = () => {
        PIXI.loader
        .add("avatar",myImage)
        .load(this.initialize);
    };

    initialize = () => {
    //We will create a sprite and then add it to stage and (0,0) position
        this.avatar = new PIXI.Sprite(PIXI.loader.resources["avatar"].texture);
        this.state.app.stage.addChild(this.avatar);
    };

    render(){
        return <div ref={this.updatePixiCnt} />
    }

    
} 






