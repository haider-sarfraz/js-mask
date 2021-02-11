/* ================================================================================ */
/* Constants
/* ================================================================================ */
const MASKING_MODES = {
    DEEP_MASK: 'mask-deep',
    JSON_MASK: 'mask-json'
}
const mode = MASKING_MODES.DEEP_MASK
const fieldsToMask = ['password']


/* ================================================================================ */
/* Imports
/* ================================================================================ */
const fs = require('fs');
const payload = require('./payload');
const maskDeep = require('mask-deep');
const maskJson = require('mask-json')(fieldsToMask,{ replacement: '*'});

/* ================================================================================ */
/* Business Logic
/* ================================================================================ */

const startTime = new Date();
console.log(`Start Time = ${startTime}`)

const duplicatePayload = Object.assign({},payload);
generateMaskedFile(duplicatePayload)
generateOriginalFile(payload)


/* ================================================================================ */
/* Implementation
/* ================================================================================ */

function maskPayload(payload){
    switch(mode){
        case MASKING_MODES.DEEP_MASK:{
            return maskDeep(payload, fieldsToMask);
        }
        case MASKING_MODES.JSON_MASK:{
            return maskJson(payload);
        }
        default:
            throw new Error('Unregistered Mode');
    }
}

function generateMaskedFile(payload) {
    
    const masked = maskPayload(payload)
    logToFile('masked',masked)

    const endTime = new Date();
    console.log(`End Time = ${endTime}`)
    console.log(`Total Time Taken (ms): ${(endTime - startTime)}`)
}

function generateOriginalFile(payload) {
    logToFile('original',payload)
}

function logToFile(fileName,payload) {
    fs.appendFileSync(`${mode}_${fileName}.txt`, `${JSON.stringify(payload)}\r\n`);
}


//108193
//2038
//1481