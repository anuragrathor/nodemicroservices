//Email

//Notification 

//OTP
export const GenerateOtp = () => {
    
    const otp = Math.floor(100000 + Math.random() * 900000)
    let expiry = new Date()
    expiry.setTime( new Date().getTime() + (30 * 60* 1000));
    
    return { otp, expiry}
}


export const onRequestOTP = async(otp: number, toPhoneNumber: string) => {

    const accountsId = 'ACb81636f83ed378b43ba5adf7d2557f21';
    const authToken = '20348a336fc303725c75f243d83ba7eb';
    const client = require('twilio')(accountsId, authToken);

    

    const response = await client.messages.create({
        body: `Your OTP is ${otp}`,
        from: '+15737734804',
        to: `+91${toPhoneNumber}`,
    })
    

    return response;


}


