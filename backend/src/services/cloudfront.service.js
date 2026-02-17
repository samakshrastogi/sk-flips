import { getSignedUrl } from "@aws-sdk/cloudfront-signer";

export const getSignedCloudFrontUrl = (s3Key) => {
    const domain = process.env.CLOUDFRONT_DOMAIN;
    const keyPairId = process.env.CLOUDFRONT_KEY_PAIR_ID;
    const privateKey = process.env.CLOUDFRONT_PRIVATE_KEY.replace(/\\n/g, "\n");

    const url = `https://${domain}/${s3Key}`;

    const signedUrl = getSignedUrl({
        url,
        keyPairId,
        privateKey,
        dateLessThan: new Date(Date.now() + 5 * 60 * 1000),
    });

    return signedUrl;
};
