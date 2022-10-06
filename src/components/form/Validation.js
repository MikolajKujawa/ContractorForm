export const peselValidation = (enteredPesel) => {
    const peselPattern = /^\d{11}|\d{11}:\d{11}|\d{11},\d{11}|\d{11};\d{11}$/;
    const signsPattern = /^[;:,]$/;

    if(!(enteredPesel).match(peselPattern)){
        return('Dane niepoprawne PESEL musi zawierac 11 cyfr')
    } else{
        const pesels = enteredPesel.split(signsPattern);
        for(let i=0; i < pesels.length; i++) {
            const pesel = pesels[i];
            const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
            let sum = 0;
            for (i = 0; i < pesel.length - 1; i++) {
                sum += ((pesel.substring(i, i + 1)) * weights[i]);
                let digit = (10 - (sum % 10) % 10);
                if (digit === 10){
                    digit = 0;
                }
                if (digit !== pesel.substring(10, 11)){
                    return('Nieprawidłowa suma kontrolna')
                }
            }
        }
    }
}

export const nipValidation = (enteredNip) => {

    if (enteredNip == null || enteredNip.length !== 10){
        return ('Dane niepoprawne NIP musi zawierac 10 cyfr');
    }
    for (let i=0; i<10; i++){
        if (isNaN(enteredNip[i])){
            return ('Dane niepoprawne NIP musi zawierac 10 cyfr');
        }
    }
    const weights = [6, 5, 7, 2, 3, 4, 5, 6, 7]
    let sum = 0
    let i

    for (i = 0; i < weights.length; i += 1) {
        sum += weights[i] * +enteredNip.charAt(i)
      }
    sum %= 11
    if (enteredNip[9] !== sum){
        return('Nieprawidłowa suma kontrolna')
    }
}