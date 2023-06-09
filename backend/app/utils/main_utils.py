#!/usr/bin/env python
# -*- coding: utf-8 -*-
import io
import logging
from typing import List

import boto3
import numpy as np
from botocore.exceptions import ClientError
import cv2
from decouple import config

session = boto3.session.Session()
s3 = session.client(
    service_name="s3",
    endpoint_url="https://hb.bizmrg.com",
    aws_access_key_id=config("AWC_ACCESS_KEY_ID"),
    aws_secret_access_key=config("AWS_SECRET_ACCESS_KEY"),
)


def upload_file(file, bucket: str, object_name: str) -> bool:
    # pylint: disable=unused-variable
    """Upload a file to an S3 bucket

    :param file_name: File to upload
    :param bucket: Bucket to upload to
    :param object_name: S3 object name. If not specified then file_name is used
    :return: True if file was uploaded, else False
    """
    try:
        # contents = file.file.read()  # noqa: F841
        # file.file.seek(0)
        response = s3.upload_fileobj(file, bucket, object_name)  # noqa: F841
    except ClientError as exception:
        logging.error(exception)
        return False
    return True


def get_file_url_from_public_bucket(bucket: str, object_name: str) -> str:
    return f"https://{bucket}.hb.bizmrg.com/{object_name}"


def collect_beaver(lst: List[np.ndarray], bucket: str, object_name: str) -> None:
    """
    input: lst: list = [shadow, boots, tail, body, and so...]
    """
    result = lst[0].copy()
    result_alpha = result[:, :, 3]
    for im in lst[1:]:
        alpha = im[:, :, 3]
        result_alpha = np.maximum(alpha, result_alpha)
        result = (
            im[:, :, :3] * (alpha[..., None] / 255.0)
            + result[:, :, :3] * (1 - (alpha[..., None] / 255.0))
        ).astype(np.uint8)
    result = np.dstack([result, result_alpha])

    file = cv2.imencode(".png", result)[1].tobytes()
    file = io.BytesIO(file)
    upload_file(
        file=file,
        bucket=bucket,
        object_name=object_name,
    )
