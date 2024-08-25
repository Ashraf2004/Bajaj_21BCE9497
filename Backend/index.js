const express = require('express');
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());

function processArray(data) {
    console.log(data);
    const numbers = [];
    const alphabets = [];
    let highestLowercaseAlphabet = '';
    
    data.forEach(item => {
        console.log(item);
        if (/^[a-zA-Z]$/.test(item)) {
            alphabets.push(item);
            if (item === item.toLowerCase() && item > highestLowercaseAlphabet) {
                highestLowercaseAlphabet = item;
            }
        } else if (/^\d+$/.test(item)) {
            numbers.push(item);
        }
    });
    
    return {
        is_success: true,
        user_id: "john_doe_17091999", // This should be dynamic in a real implementation
        email: "john@xyz.com", // This should be dynamic in a real implementation
        roll_number: "ABCD123", // This should be dynamic in a real implementation
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : []
    };
}

app.get("/",(req,res) => {
    res.send({success : "Hello World"})
})

app.post('/bfhl', (req, res) => {
    try {
        const result = processArray(req.body.data);
        res.json(result);
    } catch (error) {
        res.status(400).json({ is_success: false, error: error.message });
    }
});

app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Test cases
// const testCases = [
//     { data: ["M","1","334","4","B","Z","a"] },
//     { data: ["2","4","5","92"] },
//     { data: ["A","C","Z","c","i"] }
// ];

// console.log("Test Results:");
// testCases.forEach((testCase, index) => {
//     console.log(\nTest Case ${index + 1}:);
//     console.log("Input:", JSON.stringify(testCase));
//     const req = { body: testCase };
//     const res = {};
//     const result = processArray(req, res);
//     console.log("Output:", JSON.stringify(result, null, 2));
// });