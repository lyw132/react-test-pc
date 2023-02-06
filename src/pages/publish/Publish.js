import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "./index.scss";
import { observer } from "mobx-react-lite";
import { useStore } from "@/store";
import { useEffect, useRef, useState } from "react";
import { http } from "@/utils";

const { Option } = Select;
const Publish = () => {
  const { channelStore } = useStore();
  const [params] = useSearchParams();
  const articleId = params.get("id");
  const form = useRef(null);
  const [fileList, setFileList] = useState([]);
  // 上传成功回调
  // const onUploadChange = (info) => {
  //   const fileList = info.fileList.map((file) => {
  //     if (file.response) {
  //       return {
  //         url: file.response.data.url,
  //       };
  //     }
  //     return file;
  //   });
  //   setFileList(fileList);
  // };
  const fileListRef = useRef([]);

  const onUploadChange = ({ fileList }) => {
    setFileList(fileList);

    // 2. 上传图片时，将所有图片存储到 ref 中
    fileListRef.current = fileList;
  };

  const navigate = useNavigate();
  const onFinish = async (values) => {
    // 数据的二次处理 重点是处理cover字段
    const { channel_id, content, title, type, ...rest } = values;
    const params = {
      ...rest,
      channel_id,
      content,
      title,
      type,
      cover: {
        type: type,
        images: fileList.map((item) => item.url),
      },
    };
    if (articleId) {
      await http.put(`/mp/articles/${articleId}?draft=false`, params);
    } else {
      await http.post("/mp/articles?draft=false", params);
    }
    navigate("/article");
    message.success(`${articleId ? "更新成功" : "发布成功"}`);
  };

  // 切换图片
  const [imgCount, setImgCount] = useState(1);
  const onchangetp = (e) => {
    setImgCount(e.target.value);

    if (imgCount === 1) {
      // 单图，只展示第一张
      setFileList(fileListRef.current);
    } else if (imgCount === 3) {
      // 三图，展示所有图片
      const firstImg = fileListRef.current[0];
      setFileList(!firstImg ? [] : [firstImg]);
    }
  };

  useEffect(() => {
    async function getArticle() {
      const res = await http.get(`/mp/articles/${articleId}`);
      const { cover } = res.data;
      // 动态设置表单数据
      form.current.setFieldsValue(res.data);
      // 格式化封面图片数据
      const imageList = cover.images.map((url) => ({ url }));
      setFileList(imageList);
      setImgCount(cover.type);
      fileListRef.current = imageList;
    }
    if (articleId) {
      // 拉取数据回显
      getArticle();
      // console.log(form.current);
    }
  }, [articleId]);

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              {articleId ? "修改文章" : "发布文章"}
            </Breadcrumb.Item>
          </Breadcrumb>
        }>
        <Form
          onFinish={onFinish}
          ref={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1 }}>
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: "请输入文章标题" }]}>
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: "请选择文章频道" }]}>
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channelStore.channelList.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={onchangetp}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {imgCount > 0 && (
              <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList
                action="http://geek.itheima.net/v1_0/upload"
                fileList={fileList}
                onChange={onUploadChange}
                multiple={imgCount > 1}
                maxCount={imgCount}>
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: "请输入文章内容" }]}>
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                {articleId ? "修改文章" : "发布文章"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default observer(Publish);
