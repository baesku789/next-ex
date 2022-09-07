// import original module declarations
import 'styled-components'

// and extend
declare module 'styled-components' {
    export interface DefaultTheme {
        borderRadius: string;

        colors: {
            main:string
            secondary:string
        }
    }
}

