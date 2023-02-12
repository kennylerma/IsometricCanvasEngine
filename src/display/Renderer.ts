import { Matrix } from "./Matrix"; 

/**
 * ...
 * @author Kenny Lerma
 */
 export class Renderer 
 {
   private static _instance:Renderer;

   private constructor()
   {
      //console.log("Renderer");
   }

   public static get instance()
   {
      return this._instance || (this._instance = new this());
   }

   public render = (image:HTMLCanvasElement, ctx:CanvasRenderingContext2D, mat:Matrix):void =>
   {
      ctx.setTransform(mat.a, mat.b, mat.c, mat.d, mat.tx, mat.ty);
      ctx.drawImage(image, 0, 0); 
   }

 }