// Function to compute SHA256 hash (same as in your provided code)
async function sha256(message) {
    // encode as UTF-8
    const msgBuffer = new TextEncoder().encode(message);
  
    // hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  
    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));
  
    // convert bytes to hex string
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
    return hashHex;
  }
  
  // Function to crack the hash by trying all 3-digit numbers
  async function crackHash(targetHash) {
    console.log(`Starting brute force attack on hash: ${targetHash}`);
    
    for (let i = 100; i <= 999; i++) {
      const currentHash = await sha256(i.toString());
      
      if (currentHash === targetHash) {
        console.log(`Success! The original number is: ${i}`);
        return i;
      }
      
      if (i % 100 === 0) {
        console.log(`Tried ${i-100+1} to ${i}...`);
      }
    }
    
    console.log("No match found in range 100-999");
    return null;
  }
  
  // Execute the hash cracking with the hash displayed on the page
  async function execute() {
    const displayedHash = document.getElementById('sha256-hash').innerHTML;
    const pin = await crackHash(displayedHash);
    
    if (pin) {
      // Optional: Automatically fill in the solution
      document.getElementById('pin').value = pin;
      console.log(`Found solution: ${pin}. Enter this in the input field.`);
    }
  }
  
  // Run the cracker
  execute();

  //anwer is 654