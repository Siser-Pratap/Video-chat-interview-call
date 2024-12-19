export function middleware(){
    console.log('middleware enabled');
}


export const config = {
    matcher: ["/",
      "/login",
      "/traits",
      
    ]
  }