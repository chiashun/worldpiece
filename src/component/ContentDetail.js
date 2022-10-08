import { useParams } from "react-router-dom"

export default function ContentDetail(props){
    const {id}=useParams()
    console.log(id)
    return(
        <>
        <div>hi</div>
        </>
    )
}