import React, {Component} from 'react';
import './canvas.css';

class Canvas extends Component {
    constructor(props){
        super(props);

        this.state = {
            canvas:{
                width:document.documentElement.clientWidth,
                height:document.documentElement.clientHeight
            },
            ctx: canvas.getContext("2d"),
            animate:{
                x:200,
                dx:1
            }
        };
    }

    componentDidMount(){
        const canvas  = this.refs.canvas;
        canvas.width = this.state.canvas.width;
        canvas.height = this.state.canvas.height;
        
        
        this.state.ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
        this.state.ctx.fillRect(100, 100, 100, 100);
        this.state.ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
        this.state.ctx.fillRect(400, 100, 100, 100);
        this.state.ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
        this.state.ctx.fillRect(300, 300, 100, 100);

        //Line
        this.state.ctx.beginPath();
        this.state.ctx.moveTo(50, 300);
        this.state.ctx.lineTo(300, 100);
        this.state.ctx.stroke(); 

        //Arc / Circle
        // ctx.beginPath(); 
        // ctx. arc(300, 300, 30, 0, Math.PI * 2, false);
        // ctx.strokeStyle = 'blue';
        // ctx.stroke();

        // for (var i =0; i < 5200; i++) {
        //     var x = Math.random() * this.state.canvas.width;
        //     var y = Math.random() * this.state.canvas.height;

        //     ctx.beginPath(); 
        //     ctx. arc(x, y, 30, 0, Math.PI * 2, false);
        //     ctx.strokeStyle = 'blue';
        //     ctx.stroke();
        // }

    }

    let animate = () => {
        requestAnimationFrame(animate);
        this.state.clearReact(0, 0, this.state.innerWidth, this.state.innerHeight)
        this.state.ctx.beginPath(); 
        this.state.ctx. arc(this.state.animate.x, 300, 30, 0, Math.PI * 2, false);
        this.state.ctx.strokeStyle = 'blue';
        this.state.ctx.stroke();
        this.state.animate.x += this.state.animate.dx;
    }


    render(){
        return(
            <canvas ref="canvas"></canvas>
        )
    }
}

export default Canvas;