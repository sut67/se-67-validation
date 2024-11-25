import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Upload,
  message,
  Card,
  Row,
  Col,
  Table,
} from "antd";

const { Option } = Select;

interface StudentForm {
  student_id: string;
  first_name: string;
  last_name: string;
  gender: "male" | "female";
  email: string;
  phone_number: string;
  avatar?: any;
}

const StudentFormComponent: React.FC = () => {
  const [form] = Form.useForm();
  const [students, setStudents] = useState<StudentForm[]>([]);

  const columns = [
    {
      title: "Student ID",
      dataIndex: "student_id",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      render: (text: string) =>
        text ? <img src={text} alt="avatar" style={{ width: 50 }} /> : "N/A",
    },
    {
      title: "Name",
      render: (record: StudentForm) =>
        `${record.first_name} ${record.last_name}`,
    },
    {
      title: "Gender",
      dataIndex: "gender",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
    },
  ];

  const onFinish = (values: StudentForm) => {
    const avatarUrl =
      values.avatar?.[0]?.response?.url ||
      URL.createObjectURL(values.avatar?.[0]?.originFileObj);

    const newStudent = { ...values, avatar: avatarUrl };
    setStudents([...students, newStudent]);
    form.resetFields();
    message.success("Form submitted successfully!");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.error("Form failed: ", errorInfo);
    message.error("Form submission failed!");
  };

  return (
    <Card style={{ width: "100%", height: "100%", padding: "30px" }}>
      <Row gutter={16}>
        <Col xs={24} sm={12} md={12} lg={8} xl={8}>
          <Form
            form={form}
            name="student_form"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Student ID"
              name="student_id"
              rules={[
                { required: true, message: "Please input the student ID!" },
                {
                  pattern: /^[BMD][0-9]{7}$/,
                  message: "ID must start with 'BMD' followed by exactly 7 digits!",
                },
              ]}
            >
              <Input placeholder="Enter student ID" id={"student_id"} autoComplete="off"/>
            </Form.Item>

            <Form.Item
              label="First Name"
              name="first_name"
              rules={[
                { required: true, message: "Please input the first name!" },
              ]}
            >
              <Input placeholder="Enter first name" id={"first_name"} autoComplete="off"/>
            </Form.Item>

            <Form.Item
              label="Last Name"
              name="last_name"
              rules={[
                { required: true, message: "Please input the last name!" },
              ]}
            >
              <Input placeholder="Enter last name" id={"last_name"} autoComplete="off"/>
            </Form.Item>

            <Form.Item
              label="Gender"
              name="gender"
              rules={[{ required: true, message: "Please select gender!" }]}
            >
              <Select placeholder="Select gender" id={"gender"}>
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                {
                  type: "email",
                  message: "Please input a valid email address!",
                },
              ]}
            >
              <Input placeholder="Enter email" id={"email"} autoComplete="off"/>
            </Form.Item>

            <Form.Item
              label="Phone Number"
              name="phone_number"
              rules={[
                { required: true, message: "Please input your phone number!" },
                {
                  pattern: /^[0]\d{9}$/,
                  message: "Phone number must be exactly 10 digits and start with '0'!",
                },
              ]}
            >
              <Input placeholder="Enter phone number" id={"phone_number"} autoComplete="off"/>
            </Form.Item>

            <Form.Item
              label="Avatar"
              name="avatar"
              valuePropName="fileList"
              getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
              rules={[{ required: true }]}
            >
              <Upload
                id={"avatar"}
                listType="picture"
                beforeUpload={(file) => {
                  const isJpgOrPng =
                    file.type === "image/jpeg" || file.type === "image/png";
                  if (!isJpgOrPng) {
                    message.error("You can only upload JPG/PNG file!");
                    return Upload.LIST_IGNORE;
                  }
                  const isLt2M = file.size / 1024 / 1024 < 2;
                  if (!isLt2M) {
                    message.error("Image must smaller than 2MB!");
                    return Upload.LIST_IGNORE;
                  }
                  return false;
                }}
              >
                <Button>Upload Image</Button>
              </Upload>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col xs={24} sm={12} md={12} lg={16} xl={16}>
          <Table
            size="small"
            columns={columns}
            dataSource={students}
            rowKey="student_id"
            pagination={{ pageSize: 10 }}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default StudentFormComponent;
