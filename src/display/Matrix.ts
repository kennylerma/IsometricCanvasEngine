/**
 * 4x4 Matrix
 * @author Kenny Lerma
 */
 export class Matrix 
 {
    public a:number = 1;
    public b:number = 0;
    public c:number = 0;
    public d:number = 1;
    public tx:number = 0;
    public ty:number = 0;
    private t0:number;
    private t1:number;
    private t2:number;
    private t3:number;

    constructor(a:number = 1, b:number = 0, c:number = 0, d:number = 1, tx:number = 0, ty:number = 0)
    {
		  //console.log("Matrix");
    }

    public clone = ():Matrix =>
    {
        return new Matrix(this.a, this.b, this.c, this.d, this.tx, this.ty);
    }
    
    public concat = (m:Matrix):void =>
    {
        this.t0 = this.a;
        this.a = this.a * m.a + this.b * m.c;
        this.b = this.t0 * m.b + this.b * m.d;
        
        this.t0 = this.c;
        this.c = this.c * m.a + this.d * m.c;
        this.d = this.t0 * m.b + this.d * m.d;

        this.t0 = this.tx;
        this.tx = this.tx * m.a + this.ty * m.c + m.tx;
        this.ty = this.t0 * m.b + this.ty * m.d + m.ty;
    }
 }