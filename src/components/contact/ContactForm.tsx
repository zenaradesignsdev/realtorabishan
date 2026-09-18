'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { ArrowUpRight, Check } from 'lucide-react'
import { contactSchema, INTEREST_OPTIONS, type ContactFormValues } from './contact.schema'
import { businessInfo } from '@/lib/metadata'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { NativeSelect } from '@/components/ui/native-select'

/**
 * Underlined fields rather than boxed ones — boxes would reintroduce exactly
 * the bordered-card look the rest of the page avoids. The shadcn primitives are
 * left untouched and restyled through className, so the base components stay
 * upgradeable.
 *
 * The default focus ring is deliberately kept: an underline colour change alone
 * is not a reliable focus indicator.
 */
const FIELD =
  'h-12 rounded-none border-0 border-b border-brand/15 bg-transparent px-0 text-base text-brand placeholder:text-brand/30 focus-visible:border-terracotta-solid aria-[invalid=true]:border-destructive md:text-base'

const LABEL = 'type-label text-brand/45'

export function ContactForm() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      interest: '',
      message: '',
      website: '',
    },
  })

  const {
    mutate,
    isPending,
    isSuccess,
    reset: resetMutation,
  } = useMutation({
    mutationFn: async (data: ContactFormValues) => {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const body = await response.json().catch(() => ({}))
        throw new Error((body as { error?: string }).error ?? 'Failed to send message')
      }
    },
    onSuccess: () => {
      toast.success('Message sent — Abishan will be in touch shortly.')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Something went wrong. Please try again.')
    },
  })

  const firstName = form.getValues('name').trim().split(' ')[0] || 'there'

  if (isSuccess) {
    return (
      <div className="border rule bg-white p-9 sm:p-12">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand">
          <Check className="h-6 w-6 text-terracotta" aria-hidden="true" />
        </div>
        <h2 className="type-heading mt-7 text-3xl text-brand">Thank you, {firstName}.</h2>
        <p className="mt-4 max-w-sm text-base leading-[1.75] text-muted-foreground">
          Your message is in. Abishan will reach out shortly &mdash; usually the same day. For
          anything urgent, call{' '}
          <a
            href={`tel:${businessInfo.phone}`}
            className="font-semibold text-brand underline decoration-terracotta underline-offset-4"
          >
            {businessInfo.phoneDisplay}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => {
            form.reset()
            resetMutation()
          }}
          className="mt-8 rounded-full border border-brand/20 px-6 py-3.5 text-sm font-semibold text-brand transition-colors hover:border-brand/50"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <div className="border rule bg-white p-7 sm:p-10 lg:p-12">
      <p className="type-label text-terracotta-ink">Send a message</p>
      <h2 className="type-heading mt-5 text-[1.9rem] text-brand sm:text-[2.3rem]">
        What are you looking for?
      </h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => mutate(data))}
          noValidate
          className="relative mt-10 space-y-7"
        >
          {/* Honeypot — hidden from real users, bots fill it, server rejects those submissions */}
          <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...form.register('website')}
            />
          </div>

          <div className="grid gap-7 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={LABEL}>Full name *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your name"
                      autoComplete="name"
                      className={FIELD}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={LABEL}>Phone</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      inputMode="tel"
                      placeholder="(000) 000-0000"
                      autoComplete="tel"
                      className={FIELD}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={LABEL}>Email *</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    inputMode="email"
                    placeholder="you@email.com"
                    autoComplete="email"
                    className={FIELD}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="interest"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={LABEL}>I&rsquo;m interested in *</FormLabel>
                <FormControl>
                  <NativeSelect className={`${FIELD} pr-9`} {...field}>
                    <option value="">Select a service&hellip;</option>
                    {INTEREST_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </NativeSelect>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={LABEL}>Message *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Area, budget, timing, and anything you will not compromise on…"
                    rows={5}
                    className="min-h-[8rem] resize-none rounded-none border-0 border-b border-brand/15 bg-transparent px-0 py-3 text-base leading-relaxed text-brand placeholder:text-brand/30 focus-visible:border-terracotta-solid aria-[invalid=true]:border-destructive md:text-base"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-5 pt-2 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={isPending}
              className="group inline-flex items-center justify-between gap-4 rounded-full bg-brand py-2 pl-7 pr-2 text-white transition-colors duration-300 hover:bg-ink disabled:opacity-60 sm:justify-start"
            >
              <span className="text-base font-semibold">
                {isPending ? 'Sending…' : 'Send message'}
              </span>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-terracotta transition-transform duration-500 ease-out group-hover:rotate-45">
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </button>
            <p className="max-w-[16rem] text-xs leading-relaxed text-muted-foreground">
              Your details are used to reply to this enquiry and are never shared.
            </p>
          </div>
        </form>
      </Form>
    </div>
  )
}
