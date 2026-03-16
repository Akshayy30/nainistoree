const https = require('https');
const urls = [
  'https://images.unsplash.com/photo-1584308666744-24d5c474f2ad?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1605380290169-d9d241c0ea5b?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1558317822-6b95ee3eb149?w=200&h=200&fit=crop'
];
urls.forEach(url => {
  https.get(url, res => {
    console.log(url, res.statusCode);
  });
});
