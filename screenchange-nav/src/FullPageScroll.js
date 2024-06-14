import React from 'react'
import FullPage,{FullPageSections,FullpageSection,FullpageNavigation} from '@ap.cx/react-fullpage'
import bg from './Image/library_front.jpg'
const FullPageScroll=()=>{
    const SectionStyle={
        height: '100vh',
        width: '100%',
        display:'flex',
        justifyContent: 'center',
        alignItems:'center'
    }
    return (
        <FullPage>
            <FullpageNavigation></FullpageNavigation>
            <FullPageSections>
                <FullpageSection style={{...SectionStyle, backgroundImage:`url(${bg})`,backgroundSize:'cover'}}>
                    <h1 style={{color:'white'}}>Screen 1</h1>
                </FullpageSection>
                <FullpageSection style={SectionStyle}>
                    <h1>Screen 2</h1>
                </FullpageSection>
                <FullpageSection style={SectionStyle}>
                    <h1>Screen 3</h1>
                </FullpageSection>
            </FullPageSections>
        </FullPage>
    )
}
export default FullPageScroll