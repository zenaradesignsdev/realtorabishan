'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Check } from 'lucide-react'
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
import { Button } from '@/components/ui/button'

async function submitContactForm(data: ContactFormValues): Promise<void> {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const body = await response.json().catch(() => ({}))
    throw new Error((body as { error?: string }).error ?? 'Failed to send message')
  }
}

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
    mutationFn: submitContactForm,
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
      <div className="rounded-[22px] border border-border bg-white p-10 text-center shadow-sm sm:p-12">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand">
          <Check className="h-7 w-7 text-terracotta" aria-hidden="true" />
        </div>
        <h3 className="font-display text-2xl font-semibold text-brand">Thank you, {firstName}</h3>
        <p className="mx-auto mt-2.5 max-w-sm text-base leading-relaxed text-muted-foreground">
          Your message has been noted. Abishan will reach out shortly. For anything urgent, call{' '}
          <a href={`tel:${businessInfo.phone}`} className="font-semibold text-brand underline">
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
          className="mt-6 rounded-full border-[1.5px] border-terracotta-border px-6 py-3 text-sm font-semibold text-brand"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <div className="rounded-[22px] border border-border bg-white p-8 shadow-sm sm:p-10">
      <h2 className="font-display text-2xl font-semibold text-brand">Send a message</h2>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Fields marked with an asterisk are required.
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => mutate(data))}
          noValidate
          className="relative mt-7 space-y-5"
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

          <div className="grid gap-5 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" autoComplete="name" {...field} />
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
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="(000) 000-0000" autoComplete="tel" {...field} />
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
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="you@email.com" autoComplete="email" {...field} />
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
                <FormLabel>I&rsquo;m interested in *</FormLabel>
                <FormControl>
                  <NativeSelect {...field}>
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
                <FormLabel>Message *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell me a bit about your goals, timeline, and any questions you have…"
                    rows={5}
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            size="lg"
            disabled={isPending}
            className="w-full rounded-xl bg-brand text-base font-semibold hover:bg-brand/90 sm:w-auto"
          >
            {isPending ? 'Sending…' : 'Send Message'}
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            By submitting, you agree to be contacted about your inquiry. Your details are never
            shared.
          </p>
        </form>
      </Form>
    </div>
  )
}
