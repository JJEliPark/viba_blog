import React from "react";

// GitHub 스타일 헤더
export const MarkdownHeader = {
  h1: (props: any) => (
    <h1 {...props} className="relative">
      {props.children}
      <hr className="border-t border-gray-300 mt-2 mb-6" />
    </h1>
  ),
  h2: (props: any) => (
    <h2 {...props} className="relative">
      {props.children}
      <hr className="border-t border-gray-300 mt-2 mb-6" />
    </h2>
  ),
  h3: (props: any) => (
    <h3 {...props} className="relative">
      {props.children}
      <hr className="border-t border-gray-300 mt-2 mb-6" />
    </h3>
  ),
};

// 코드 블록 스타일
export const MarkdownCode = {
  code: (props: {
    inline?: boolean;
    className?: string;
    children?: React.ReactNode;
  }) => {
    const { inline, className, children } = props;
    const match = /language-(\w+)/.exec(className || "");
    return !inline ? (
      <pre className="bg-gray-800 text-white p-4 rounded-md overflow-auto">
        <code className={className}>{children}</code>
      </pre>
    ) : (
      <code className="bg-gray-100 text-red-600 p-1 rounded-md">
        {children}
      </code>
    );
  },
};

// 테이블 스타일
export const MarkdownTable = {
  table: (props: any) => (
    <table className="min-w-full table-auto border-collapse border border-gray-200">
      {props.children}
    </table>
  ),
  thead: (props: any) => (
    <thead className="bg-gray-100">{props.children}</thead>
  ),
  tbody: (props: any) => (
    <tbody className="bg-white divide-y divide-gray-200">
      {props.children}
    </tbody>
  ),
  th: (props: any) => (
    <th
      {...props}
      className="px-4 py-2 text-left text-sm font-medium text-gray-900 border border-gray-300"
    >
      {props.children}
    </th>
  ),
  td: (props: any) => (
    <td
      {...props}
      className="px-4 py-2 text-sm text-gray-700 border border-gray-300"
    >
      {props.children}
    </td>
  ),
};
