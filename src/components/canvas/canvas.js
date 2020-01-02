import React, {Component} from 'react';
import './canvas.css';

class Canvas extends Component {
    constructor(props){
        super(props);
        this.state= {
            circle: {
                x:0,
                y:0,
                dy:8,
                dx:8,
                radius:30
            },
            hexagon: {
                size:40,
                hexOrigin:{x: Math.round(document.documentElement.clientWidth / 2), y:Math.round(document.documentElement.clientHeight / 2)}
            },
            timeout:false,
            delay:250
        };
    }

    componentDidMount(){
        
        this.adjustScreen();

        window.addEventListener('resize', () => {
            clearTimeout(this.state.timeout);
            this.setState({timeout: setTimeout(this.adjustScreen, this.state.delay)});
        });
    }

    adjustScreen = () => {
        const canvas  = this.refs.canvas;
        canvas.height = document.documentElement.clientHeight;
        canvas.width  = document.documentElement.clientWidth;

        this.setState({
            canvas:{
                ctx: canvas.getContext("2d"),
                innerHeight: canvas.height,
                innerWidth: canvas.width
            }
        }, function(){
            const {ctx, innerWidth, innerHeight }  = this.state.canvas;
            
            ctx.clearRect(0, 0, this.state.canvas.width, this.state.canvas.height);
            const hexagon =  new Hexagon(ctx,  {x:0, y:0}, this.state.hexagon.size, this.state.hexagon.hexOrigin, innerWidth, innerHeight);
            hexagon.drawHexes();
        });

        if( canvas.height > canvas.width ) {
            
        }
        else {
            
        }

    }

    animate = () => {
        let x  = this.state.animate.x;
        let y  = this.state.animate.y;
        let dx = this.state.animate.dx;

        const {ctx, innerHeight, innerWidth } = this.state.canvas;
        requestAnimationFrame(this.animate);
        this.state.ctx.clearRect(0, 0, this.state.canvas.width, this.state.canvas.height);
        ctx.beginPath();
        ctx.arc(x, y, 30, 0, Math.PI * 2, false);
        ctx.strokeStyle = 'blue';
        ctx.stroke();

        // if (x + this.state.animate.radius > this.state.canvas.width || x - this.state.animate.radius < 0 ) {
        //     this.state.animate.dx = -this.state.animate.dx;
        // }

        // this.state.circle.draw();

        // if (y + this.state.animate.radius > this.state.canvas.height || y - this.state.animate.radius < 0 ) {
        //     this.state.animate.dy = -this.state.animate.dy;
        // }

        // this.state.animate.x += this.state.animate.dx;
        // this.state.animate.y += this.state.animate.dy;
    }

    render(){ 
        return <canvas ref="canvas" style={{background:"white"}}></canvas>
    }

}

function Hexagon(ctx, center, size, hexOrigin, canvasWidth, canvasHeight) {
    this.ctx = ctx;
    this.center = center;
    this.size = size;
    this.hexOrigin = hexOrigin

    this.getHexCornerCoord =  function(center, i) {
        let angle_deg = 60 * i + 60;
        let angle_rad = Math.PI / 180 * angle_deg;
        let x = center.x + size * Math.cos(angle_rad);
        let y = center.y + size * Math.sin(angle_rad);
        const point = new Point(x, y);
        return point;
    }

    this.getHexParameters = function() {
        let hexHeight = size * 2;
        let hexWidth = Math.sqrt(3)/2 * hexHeight;  
        let vertDist = hexHeight * 3/4;
        let horizDist = hexWidth;
        return { hexWidth, hexHeight, vertDist, horizDist };
    }

    this.hexToPixel = function(h) {
        let x = this.size * Math.sqrt(11) * (h.q + h.r/2) + hexOrigin.x;
        let y = this.size * 3/3.1 * h.r + hexOrigin.y;
        
        const point = new Point(x, y);
        return point;
    }

    this.drawHex = function(center, fillColor) {
        for (let i = 0; i <= 5; i++) {
            let start = this.getHexCornerCoord(center, i);
            let end   = this.getHexCornerCoord(center, i + 1);
            this.fillHex(center, fillColor)
            this.drawLine({x: start.x, y: start.y}, {x:end.x, y: end.y});
        }
    }

    this.drawLine =  function(start, end) { 
        this.ctx.beginPath();
        this.ctx.moveTo(start.x, start.y);
        this.ctx.lineTo(end.x, end.y);
        this.ctx.strokeStyle = 'green';
        this.ctx.stroke();
        this.ctx.closePath();
    }

    this.drawHexes = function() {
        const { hexWidth, hexHeight, vertDist, horizDist } = this.getHexParameters();
        let qLeftSide = Math.round(hexOrigin.x / hexWidth);
        let qRightSide = Math.round(canvasWidth - hexOrigin.x)/hexWidth;
        let rTopSide = Math.round(hexOrigin.y / (hexHeight/3) );
        let rBottomSide = Math.round((canvasHeight - hexOrigin.y) / (hexHeight/2));

        for (let r = -rTopSide; r <= rBottomSide; r++) {
            for (let q = -qLeftSide-4; q <= qRightSide+4; q++) {
                let center = this.hexToPixel(new Hex(q, r));
                this.drawHex(center, "black");
                this.drawHexCoordinates(center, new Hex(q, r));
            }
        }
    }

    this.fillHex = function(center, fillColor) {
        
        let c0 = this.getHexCornerCoord(center, 0);
        let c1 = this.getHexCornerCoord(center, 1);
        let c2 = this.getHexCornerCoord(center, 2);
        let c3 = this.getHexCornerCoord(center, 3);
        let c4 = this.getHexCornerCoord(center, 4);
        let c5 = this.getHexCornerCoord(center, 5);

        this.ctx.beginPath();
        this.ctx.fillStyle = fillColor;
        this.ctx.globalAlpha = .5;
        this.ctx.moveTo(c0.x ,c0.y);
        this.ctx.moveTo(c1.x ,c1.y);
        this.ctx.moveTo(c2.x ,c2.y);
        this.ctx.moveTo(c3.x ,c3.y);
        this.ctx.moveTo(c4.x ,c4.y);
        this.ctx.moveTo(c5.x ,c5.y);
        this.ctx.closePath();
        this.ctx.fill();


    }

    this.drawHexCoordinates = function(center, h) {
        this.ctx.fillText(h.q, center.x-10, center.y);
        this.ctx.fillText(h.r, center.x, center.y);
    }
    
    this.point = function(x, y) {
        return { x:x, y: y };
    }

    this.animate = function() {
        const ctx = this.state.ctx;
        let x  = this.state.animate.x;
        let y  = this.state.animate.y;
        let dx = this.state.animate.dx;
        let dy = this.state.animate.dy;

        requestAnimationFrame(this.animate);
        this.state.ctx.clearRect(0, 0, this.state.canvas.width, this.state.canvas.height);
        ctx.beginPath();
        ctx. arc(x, y, 30, 0, Math.PI * 2, false);
        ctx.strokeStyle = 'blue';
        ctx.stroke();
    } 

    // this.animateHexes = function() {
    //     array.forEach(element => {
            
    //     });
    // }
}

function Point(x, y) {
    return { x:x, y: y };
}

function Hex(q, r ) {
    return { q: q, r: r };
}

function Circle(x, y, ctx, radius, dy, dx, innerWidth, innerHeight) {

    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.dy = dy;
    this.dx = dx;
    this.radius = radius;
    this.innerHeight = innerHeight;
    this.innerWidth = innerWidth;
    
    this.draw = function() {
        this.ctx.beginPath(); 
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.ctx.strokeStyle = 'white';
        this.ctx.stroke();
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

