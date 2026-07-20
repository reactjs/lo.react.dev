/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import * as React from 'react';
import Image from 'next/image';
import {IconTwitter} from '../Icon/IconTwitter';
import {IconThreads} from '../Icon/IconThreads';
import {IconGitHub} from '../Icon/IconGitHub';
import {ExternalLink} from '../ExternalLink';
import {H3} from './Heading';
import {IconLink} from 'components/Icon/IconLink';

interface TeamMemberProps {
  name: string;
  title: string;
  permalink: string;
  children?: React.ReactNode;
  photo: string;
  twitter?: string;
  threads?: string;
  github?: string;
  personal?: string;
  // Comma-separated list of working groups. Suffix a group with `*` to mark
  // that the member represents it on the Leadership Council, e.g. "Fiber*, DOM".
  group?: string;
}

function GroupBadges({group}: {group: string}) {
  const groups = group
    .split(',')
    .map((g) => g.trim())
    .filter(Boolean);
  if (groups.length === 0) {
    return null;
  }
  return (
    <div className="flex flex-row flex-wrap gap-2 my-3">
      {groups.map((g) => {
        const isLead = g.endsWith('*');
        const label = isLead ? g.slice(0, -1).trim() : g;
        return (
          <span
            key={g}
            className="inline-flex items-center rounded-full bg-blue-10 dark:bg-gray-80 text-link dark:text-link-dark px-3 py-1 text-sm font-medium whitespace-nowrap">
            {label}
            {isLead && (
              <span
                className="ps-1 text-yellow-50"
                aria-label="Leadership Council"
                title="Leadership Council">
                ★
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}

// TODO: good alt text for images/links
export function TeamMember({
  name,
  title,
  permalink,
  children,
  photo,
  github,
  twitter,
  threads,
  personal,
  group,
}: TeamMemberProps) {
<<<<<<< HEAD
  if (name == null || title == null || permalink == null || children == null) {
    throw new Error(
      'Expected name, title, permalink, and children for ' + name ??
        title ??
        permalink ??
        'unknown'
    );
=======
  if (name == null || title == null || permalink == null) {
    const identifier = name ?? title ?? permalink ?? 'unknown';
    throw new Error(`Expected name, title, and permalink for ${identifier}`);
>>>>>>> 6be2b020a0cabf2fd6dbff5c42c399b8ac323bca
  }
  return (
    <div className="pb-6 sm:pb-10">
      <div className="flex flex-col sm:flex-row height-auto">
        <div
          className="hidden sm:block basis-2/5 rounded overflow-hidden relative"
          style={{width: 300, height: 250}}>
          <Image src={photo} layout="fill" objectFit="cover" alt={name} />
        </div>
        <div
          style={{minHeight: 300}}
          className="block w-full sm:hidden flex-grow basis-2/5 rounded overflow-hidden relative">
          <Image src={photo} layout="fill" objectFit="cover" alt={name} />
        </div>
        <div className="ps-0 sm:ps-6 basis-3/5 items-start">
          <H3 className="mb-1 sm:my-0" id={permalink}>
            {name}
          </H3>
          {title && <div>{title}</div>}
          {group && <GroupBadges group={group} />}
          {children}
          <div className="sm:flex sm:flex-row flex-wrap">
            {twitter && (
              <div className="me-4">
                <ExternalLink
                  aria-label="React on Twitter"
                  href={`https://twitter.com/${twitter}`}
                  className="hover:text-primary dark:text-primary-dark flex flex-row items-center">
                  <IconTwitter className="pe-1" />
                  {twitter}
                </ExternalLink>
              </div>
            )}
            {threads && (
              <div className="me-4">
                <ExternalLink
                  aria-label="React on Threads"
                  href={`https://threads.net/${threads}`}
                  className="hover:text-primary hover:underline dark:text-primary-dark flex flex-row items-center">
                  <IconThreads className="pe-1" />
                  {threads}
                </ExternalLink>
              </div>
            )}
            {github && (
              <div className="me-4">
                <ExternalLink
                  aria-label="GitHub Profile"
                  href={`https://github.com/${github}`}
                  className="hover:text-primary dark:text-primary-dark flex flex-row items-center">
                  <IconGitHub className="pe-1" /> {github}
                </ExternalLink>
              </div>
            )}
            {personal && (
              <ExternalLink
                aria-label="Personal Site"
                href={`https://${personal}`}
                className="hover:text-primary dark:text-primary-dark flex flex-row items-center">
                <IconLink className="pe-1" /> {personal}
              </ExternalLink>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
