import React, { useEffect } from "react";
import "./verifyEmail.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../api/axios";

function EmailVerify() {
    const {exceptId} =useParams();
    console.log(exceptId.split(":")[0],exceptId.split(":")[1]);
    const navigate = useNavigate();
    useEffect(()=>{
        if(exceptId){
            const checkEmail = async ()=>{
                try {
                    const request = await axios.get(`/Members/confirm-email/${exceptId.split(":")[0]}/${exceptId.split(":")[1]}`)
                    if(request.status===200){
                        navigate('/verifyEmailCorrect')
                    }
                } catch (error) {
                    navigate('/verifyEmailIncorrect')
                }
            }
            checkEmail();
        }
    },[exceptId, navigate])
  return (
    <div>
    </div>
  );
}

export default EmailVerify;
