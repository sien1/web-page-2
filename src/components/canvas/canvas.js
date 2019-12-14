import React, {Component} from 'react';
import './canvas.css';

class Canvas extends Component {
    constructor(props){
        super(props);
        this.state= {};
    }

    componentDidMount(){
        const canvas  = this.refs.canvas;
        canvas.width  =  document.documentElement.clientWidth;
        canvas.height = document.documentElement.clientHeight;

        const ctx = canvas.getContext("2d");
        const circle  = new Circle(ctx);

        circle.draw();
    }

    animate() {
        console.log("klsdfsnmklsdfklsdfkdfsjkl");
    }

    render(){
        return <canvas ref="canvas"></canvas>
    }

}

function Circle(x, y, ctx, radius, dy, dx, innerWidth, innerHeight) {
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.dx = dx;
    this.radius = radius;
    this.innerHeight = innerHeight;
    this.innerWidth = innerWidth;
    
    this.draw = function() {
        ctx.beginPath(); 
        ctx.arc(300, 300, 30, 0, Math.PI * 2, false);
        ctx.strokeStyle = 'blue';
        ctx.stroke();
    }

    this.update = function(){
        if (this.x + this.radius > this.innerWidth || this.x - this.radius < 0 ) {
            this.dx = -this.dx;
        }

        if (this.y + this.radius > this.innerHeight || this.y - this.radius < 0 ) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;
    }

}

export default Canvas;

// class Canvas extends Component {
//     constructor(props){
//         super(props);

//         this.state = {
//             canvas:{
//                 width:document.documentElement.clientWidth,
//                 height:document.documentElement.clientHeight
//             },
//             ctx: '',
//             animate:{
//                 x:Math.random() * document.documentElement.clientWidth,
//                 y:Math.random() * document.documentElement.clientHeight,
//                 dx:(Math.random() - 0.5) * 50,
//                 dy:(Math.random() - 0.5) * 50,
//                 radius:30
//             },
//             circle:''
//         };
//     }

//     componentDidMount(){
        
//         const canvas   = this.refs.canvas;
//         canvas.width   = this.state.canvas.width;
//         canvas.height  = this.state.canvas.height;
        
//         this.state.ctx = canvas.getContext("2d");

//         // this.state.ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
//         // this.state.ctx.fillRect(100, 100, 100, 100);
//         // this.state.ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
//         // this.state.ctx.fillRect(400, 100, 100, 100);
//         // this.state.ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
//         // this.state.ctx.fillRect(300, 300, 100, 100);

//         // //Line
//         // this.state.ctx.beginPath();
//         // this.state.ctx.moveTo(50, 300);
//         // this.state.ctx.lineTo(300, 100);
//         // this.state.ctx.stroke(); 

//         //Arc / Circle
//         // ctx.beginPath(); 
//         // ctx. arc(300, 300, 30, 0, Math.PI * 2, false);
//         // ctx.strokeStyle = 'blue';
//         // ctx.stroke();

//         // for (var i =0; i < 5200; i++) {
//         //     var x = Math.random() * this.state.canvas.width;
//         //     var y = Math.random() * this.state.canvas.height;

//         //     ctx.beginPath(); 
//         //     ctx. arc(x, y, 30, 0, Math.PI * 2, false);
//         //     ctx.strokeStyle = 'blue';
//         //     ctx.stroke();
//         // }
//         let stAnim = this.state.animate;
//        this.state.circle = new Circle(stAnim.x, stAnim.y, this.state.ctx, stAnim.radius, stAnim.dx, stAnim.dy, this.state.canvas.innerHeight, this.state.canvas.innerWidth);
//         this.state.circle.draw();
//        this.animate();
//     }

  

//     animate = () => {
//         const ctx = this.state.ctx;
//         let x  = this.state.animate.x;
//         let y  = this.state.animate.y;
//         let dx = this.state.animate.dx;

//         requestAnimationFrame(this.animate);
//         this.state.ctx.clearRect(0, 0, this.state.canvas.width, this.state.canvas.height);
//         ctx.beginPath(); 
//         ctx. arc(x, y, 30, 0, Math.PI * 2, false);
//         ctx.strokeStyle = 'blue';
//         ctx.stroke();

       
        
//         // if (x + this.state.animate.radius > this.state.canvas.width || x - this.state.animate.radius < 0 ) {
//         //     this.state.animate.dx = -this.state.animate.dx;
//         // }

//         // this.state.circle.draw();

//         // if (y + this.state.animate.radius > this.state.canvas.height || y - this.state.animate.radius < 0 ) {
//         //     this.state.animate.dy = -this.state.animate.dy;
//         // }

//         // this.state.animate.x += this.state.animate.dx;
//         // this.state.animate.y += this.state.animate.dy;
//     }

//     render(){
//         return(
//             <canvas ref="canvas"></canvas>
//         )
//     }
// }

// function Circle(x, y, ctx, radius, dy, dx, innerWidth, innerHeight) {
    
//     this.x = x;
//     this.y = y;
//     this.dy = dy;
//     this.dx = dx;
//     this.radius = radius;
//     this.innerHeight = innerHeight;
//     this.innerWidth = innerWidth;

//     this.draw = function(){
        
//         ctx.beginPath(); 
//         ctx.arc(this.x, this.y, 30, 0, Math.PI * 2, false);
//         ctx.strokeStyle = 'blue';
//         ctx.stroke();
//     }

//     this.update = function(){
//         if (this.x + this.radius > this.innerWidth || this.x - this.radius < 0 ) {
//             this.dx = -this.dx;
//         }

//         if (this.y + this.radius > this.innerHeight || this.y - this.radius < 0 ) {
//             this.dy = -this.dy;
//         }

//         this.x += this.dx;
//         this.y += this.dy;
//     }
// }

// export default Canvas;

