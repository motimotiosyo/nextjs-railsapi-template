"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [apiStatus, setApiStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [apiMessage, setApiMessage] = useState<string>("");

  useEffect(() => {
    const checkApiHealth = async () => {
      try {
        const apiBaseUrl =
          process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api/v1";
        const response = await fetch(`${apiBaseUrl}/health`);
        const data = await response.json();

        if (response.ok && data.status === "ok") {
          setApiStatus("success");
          setApiMessage(data.message || "API connection successful");
        } else {
          setApiStatus("error");
          setApiMessage("API returned an error");
        }
      } catch (error) {
        setApiStatus("error");
        setApiMessage(
          error instanceof Error ? error.message : "Failed to connect to API"
        );
      }
    };

    checkApiHealth();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6">
          テンプレート疎通確認
        </h1>

        <div className="space-y-4">
          {/* Frontend Status */}
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <span className="font-medium text-gray-700">フロントエンド</span>
            <span className="text-green-600 font-semibold">✓ 起動中</span>
          </div>

          {/* Backend Status */}
          <div
            className={`flex items-center justify-between p-4 rounded-lg ${
              apiStatus === "loading"
                ? "bg-yellow-50"
                : apiStatus === "success"
                  ? "bg-green-50"
                  : "bg-red-50"
            }`}
          >
            <span className="font-medium text-gray-700">バックエンドAPI</span>
            <span
              className={`font-semibold ${
                apiStatus === "loading"
                  ? "text-yellow-600"
                  : apiStatus === "success"
                    ? "text-green-600"
                    : "text-red-600"
              }`}
            >
              {apiStatus === "loading"
                ? "⋯ 確認中"
                : apiStatus === "success"
                  ? "✓ 接続成功"
                  : "✗ エラー"}
            </span>
          </div>

          {/* API Message */}
          {apiStatus !== "loading" && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">{apiMessage}</p>
            </div>
          )}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>注意:</strong> これは疎通確認用のサンプルページです。プロジェクトに合わせて作り直してください。
          </p>
        </div>
      </div>
    </div>
  );
}
