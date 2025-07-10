import dotenv from "dotenv";
dotenv.config();

const requiredEnv = {
  DISCORD: ["TOKEN", "CLIENT_ID"],
};

const config = {};

// 필수 환경 변수를 검사하고 설정되지 않은 변수가 있을 경우 오류를 발생시킵니다.
Object.keys(requiredEnv).forEach((key) => {
  requiredEnv[key].forEach((envVar) => {
    const fullEnvVar = `${key}_${envVar}`;
    if (!process.env[fullEnvVar]) {
      throw new Error(`Missing required environment variable: ${fullEnvVar}`);
    }
    if (!config[key]) {
      config[key] = {};
    }
    config[key][envVar] = process.env[fullEnvVar];
  });
});

const flattenedConfig = Object.entries(config).reduce(
  (acc, [namespace, values]) => {
    Object.entries(values).forEach(([key, value]) => {
      acc[`${namespace}_${key}`] = value;
    });

    return acc;
  },
  {}
);

export default flattenedConfig;
